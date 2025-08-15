from fastapi import Response, HTTPException, Request
from sqlalchemy import text
import secrets
import bcrypt


def login(SessionLocal, sessions, response: Response, username: str, password: str):
    with SessionLocal() as session:
        cred_stmt = text("SELECT id, username, hashed_password from users WHERE username = :username")
        cred_result = session.execute(cred_stmt, {"username": username}).fetchone()
    if not cred_result:
        raise HTTPException(status_code=401, detail="No matching username, please create an account.")

    db_hashed_password = cred_result[2]
    if isinstance(db_hashed_password, str):
        db_hashed_password = db_hashed_password.encode("utf-8")
    password_bytes = password.encode("utf-8")

    if bcrypt.checkpw(password_bytes, db_hashed_password):
        session_id = secrets.token_hex(16)
        sessions[session_id] = {"username": username}
        response.set_cookie(key="session_id", value=session_id, httponly=True, samesite="Lax", secure=False)
        return {"message": f"Logged in as {username}", "userId": cred_result[0]}
    else:
        raise HTTPException(status_code=401, detail="Password does not match")

def get_me(SessionLocal, sessions, request: Request):
    session_id = request.cookies.get("session_id")
    if not session_id or session_id not in sessions:
        raise HTTPException(status_code=401, detail="Not Logged In")
    username = sessions[session_id]["username"]
    with SessionLocal() as session:
        user_stmt = text("SELECT id FROM users WHERE username = :username")
        user_result = session.execute(user_stmt, {"username": username}).fetchone()
        user_id = user_result.id
    return {"username": sessions[session_id]["username"], "user_id": user_id}

def signup(SessionLocal, sessions, response: Response, username: str, password: str):
    with SessionLocal() as session:
        cred_stmt = text("SELECT username FROM users WHERE username= :username")
        existing_user = session.execute(cred_stmt, {"username": username}).fetchone()
        if existing_user is not None:
            raise HTTPException(status_code=400, detail="Username already exists, please log in.")
        # if not, hash the password and create user
        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        hashed_pw_str = hashed_pw.decode('utf-8')
        user_stmt = text("INSERT INTO users (email, username, hashed_password, full_name) VALUES ('example@gmail.com', :username, :hashed_pw, 'Raymond Chen')")
        session.execute(user_stmt, {"username": username, "hashed_pw": hashed_pw_str})
        session.commit()
        # create session
        session_id = secrets.token_hex(16)
        sessions[session_id] = {"username": username}
        response.set_cookie(key="session_id", value=session_id, httponly=True, samesite="Lax", secure=False)
        return {"message": "Successfully signed up"}