from fastapi import FastAPI, Query, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from pydantic import BaseModel
import json
import os
import bcrypt
import secrets

app = FastAPI()
load_dotenv()

# CORS config (adjust as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sessions = {} # in-memory sessions
print(sessions)

# DB config
DATABASE_URL = os.getenv("DB_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

@app.get("/me")
def get_me(request: Request):
    session_id = request.cookies.get("session_id")
    if not session_id or session_id not in sessions:
        raise HTTPException(status_code=401, detail="Not Logged In")
    username = sessions[session_id]["username"]
    with SessionLocal() as session:
        user_stmt = text("SELECT id FROM users WHERE username = :username")
        user_result = session.execute(user_stmt, {"username": username}).fetchone()
        user_id = user_result.id
    return {"username": sessions[session_id]["username"], "user_id": user_id}

@app.get("/login")
def login(response: Response, username: str, password: str):
    with SessionLocal() as session:
        cred_stmt = text("SELECT id, username, hashed_password from users WHERE username = :username")
        cred_result = session.execute(cred_stmt, {"username": username}).fetchone()
    if not cred_result:
        raise HTTPException(status_code=401, detail="No matching username, please create an account.")
    # print(cred_result, len(cred_result))
    db_hashed_password = cred_result[2]
    print(db_hashed_password)
    if isinstance(db_hashed_password, str):
        db_hashed_password = db_hashed_password.encode("utf-8")
    password_bytes = password.encode("utf-8")


    if bcrypt.checkpw(password_bytes, db_hashed_password):
        session_id = secrets.token_hex(16)
        sessions[session_id] = {"username": username}
        response.set_cookie(key="session_id", value=session_id, httponly=True, samesite="Lax", secure=False)
        return {"message": f"Logged in as {username}", "userId": cred_result[0]}
    else:
        raise HTTPException(status_code=401, detail="Password does not match.")
    return {}

@app.get("/signup")
def signup(response: Response, username: str, password: str):
    print("Reached Signup Backend")
    # Check if there is already a username or not
    with SessionLocal() as session:
        cred_stmt = text("SELECT username FROM users WHERE username= :username")
        existing_user = session.execute(cred_stmt, {"username": username}).fetchone()
        if existing_user is not None:
            raise HTTPException(status_code=400, detail="Username already exists.")
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


@app.get("/userdata")
def get_userdata(userId: int = Query(...)):
    print("UserId", userId)
    with SessionLocal() as session:
        user_stmt = text("SELECT * FROM users WHERE id = :userId")
        user_result = session.execute(user_stmt, {"userId": userId})
        user_data = [dict(row._mapping) for row in user_result]

        join_stmt = text("""
            SELECT 
                uq.id AS uq_id,
                uq.parameter,
                qt.id AS qt_id,
                qt.quest_name,
                qt.description,
                qt.parameter_schema
            FROM user_quest uq
            JOIN quest_template qt ON uq.template_id = qt.id
            WHERE uq.user_id = :userId AND uq.active = true;
        """)
        joined_result = session.execute(join_stmt, {"userId": userId})
        
        user_quests = []
        for row in joined_result:
            user_quests.append({
                "id": row.uq_id,
                "parameters": json.loads(row.parameter) if row.parameter else {},
                "template": {
                    "id": row.qt_id,
                    "quest_name": row.quest_name,
                    "description": row.description,
                    "parameter_schema": row.parameter_schema
                }
            })
    print(user_quests)
    return {"userData": user_data, "userQuests": user_quests}

@app.get("/get_templates")
def get_templates(userId: int = Query(...)):
    with SessionLocal() as session:
        template_stmt = text("""
            SELECT qt.*
                FROM quest_template qt
                LEFT JOIN user_quest uq 
                ON uq.template_id = qt.id 
                AND uq.user_id = :userId 
                AND uq.active = true
            WHERE uq.id IS NULL;
        """)
        result = session.execute(template_stmt, {"userId": userId})
        data = [dict(row._mapping) for row in result]
        return data
    

class UserQuest(BaseModel):
    user_id: int
    template_id: int
    active: bool
    parameter: dict

@app.post("/addUserQuest")
def add_user(userInfo: UserQuest):
    print(userInfo)

    with SessionLocal() as session:
        userQuest_stmt = text("INSERT INTO user_quest (user_id, template_id, active, parameter) VALUES (:user_id, :template_id, :active, :parameter)")
        result = session.execute(userQuest_stmt, {"user_id": userInfo.user_id, "template_id": userInfo.template_id, 
                                                  "active": userInfo.active, "parameter": json.dumps(userInfo.parameter)})
        session.commit()
    return {"message": "reached", "data": ""}
