from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from pydantic import BaseModel
import os

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

# DB config
DATABASE_URL = os.getenv("DB_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

@app.get("/userdata")
def get_userdata(userId: int = Query(...)):
    with SessionLocal() as session:
        # Fetch user info (safe way)
        user_stmt = text("SELECT * FROM users WHERE id = :userId")
        user_result = session.execute(user_stmt, {"userId": userId})
        user_data = [dict(row._mapping) for row in user_result]

        # Join user_quest with quest_template
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
                "progress": row.progress,
                "parameters": row.parameters,
                "template": {
                    "id": row.qt_id,
                    "quest_name": row.quest_name,
                    "description": row.description,
                    "parameter_schema": row.parameter_schema
                }
            })

    return {"userData": user_data, "userQuests": user_quests}

@app.get("/get_templates")
def get_templates():
    with SessionLocal() as session:
        template_stmt = text("SELECT * FROM quest_template")
        result = session.execute(template_stmt)
        data = [dict(row._mapping) for row in result]
        return data
    

class UserQuest(BaseModel):
    user_id: int
    template_id: int
    active: bool
    parameter: str

@app.post("/addUserQuest")
def add_user(userInfo: UserQuest):
    print(userInfo)
    return {"message": "reached", "data": userInfo}
