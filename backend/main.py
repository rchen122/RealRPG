from fastapi import FastAPI, Query, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from pydantic import BaseModel
import json
import os
import datetime
from crud import auth, users

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

# DB config
DATABASE_URL = os.getenv("DB_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

@app.get("/me")
def get_me(request: Request):
    return auth.get_me(SessionLocal, sessions, request)

@app.get("/login")
def login(response: Response, username: str, password: str):
    return auth.login(SessionLocal, sessions, response, username, password)

@app.post("/signup")
def signup(response: Response, username: str, password: str):
    return auth.signup(SessionLocal, sessions, response, username, password)


@app.get("/checklogs")
def check_logs(user_id: int):
    with SessionLocal() as session:
        active_quests = text("""
            SELECT 
                uq.id AS user_id,
                uq.parameters,
                qt.id AS template_id
            FROM user_quest uq
            JOIN quest_template qt ON uq.template_id = qt.id
            WHERE uq.user_id = :userId;
        """)
        results = session.execute(active_quests, {"userId": user_id}).mappings().all()
        if len(results) == 0:
            return {"message": "No active Quests"}
        print(results)
        current_date = datetime.date.today()

        for quest in results:
            print(quest)
            template_id = quest["template_id"]
            unit = list(quest["parameters"].keys())[0]
            sql = text("""
                INSERT INTO user_quest_log (user_id, template_id, quest_date, completed, progress_data)
                SELECT :user_id, :template_id, :current_date, false, :progress_data
                WHERE NOT EXISTS (
                    SELECT 1 FROM user_quest_log
                    WHERE user_id = :user_id
                    AND template_id = :template_id
                    AND quest_date::date = :current_date
                )
            """)
            progress_data_json = {unit: 0}
            session.execute(sql, {
                "user_id": user_id,
                "template_id": template_id,
                "current_date": current_date,
                "progress_data": json.dumps(progress_data_json)
            })
        session.commit()
    return {"message": "Finished log checks"}






@app.get("/userdata")
def get_userdata(userId):
    return users.get_userdata(SessionLocal, userId)

@app.get("/get_templates")
def get_templates(userId: int = Query(...)):
    return users.get_templates(SessionLocal, userId)
    

class UserQuest(BaseModel):
    user_id: int
    template_id: int
    parameter: dict
    # mode: str

@app.put("/updateUserQuest")
def update_user(userInfo: UserQuest):
    return users.update_user_quest(SessionLocal, userInfo)

@app.post("/updateUserQuest")
def add_user_quest(userInfo: UserQuest):
    return users.add_user_quest(SessionLocal, userInfo)

@app.delete("/updateUserQuest")
def delete_user_quest(userInfo: UserQuest):
    return users.delete_user_quest(SessionLocal, userInfo)