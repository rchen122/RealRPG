from fastapi import Query
from sqlalchemy import text
from pydantic import BaseModel
import datetime
import json

def get_userdata(SessionLocal, userId: int = Query(...)):
    with SessionLocal() as session:
        user_stmt = text("SELECT id, email, username, full_name, streak FROM users WHERE id = :userId")
        user_result = session.execute(user_stmt, {"userId": userId})
        user_data = [dict(row._mapping) for row in user_result]

        join_stmt = text("""
            SELECT 
                uq.id AS uq_id,
                uq.parameters,
                qt.id AS qt_id,
                qt.quest_name,
                qt.description,
                qt.parameter_schema
            FROM user_quest uq
            JOIN quest_template qt ON uq.template_id = qt.id
            WHERE uq.user_id = :userId;
        """)
        joined_result = session.execute(join_stmt, {"userId": userId})
        
        user_quests = []
        for row in joined_result:

            progress_stmt = text("""
                SELECT progress_data
                FROM user_quest_log
                WHERE user_id = :userId
                  AND template_id = :template_id
                  AND quest_date::date = :today
            """)
            progress_result = session.execute(progress_stmt, {
                "userId": userId,
                "template_id": row.qt_id,
                "today": datetime.date.today()
            }).fetchone()
            progress_data = progress_result.progress_data if progress_result else {}
            user_quests.append({
                "id": row.uq_id,
                "parameters": row.parameters,
                "template": {
                    "id": row.qt_id,
                    "quest_name": row.quest_name,
                    "description": row.description,
                    "parameter_schema": row.parameter_schema
                },
                "progress_data": progress_data
            })
    return {"userData": user_data, "userQuests": user_quests}

def get_templates(SessionLocal, userId: int = Query(...)):
    with SessionLocal() as session:
        template_stmt = text("""
            SELECT qt.*
                FROM quest_template qt
                LEFT JOIN user_quest uq 
                ON uq.template_id = qt.id 
                AND uq.user_id = :userId 
            WHERE uq.id IS NULL;
        """)
        result = session.execute(template_stmt, {"userId": userId})
        data = [dict(row._mapping) for row in result]
        return data
    

def add_user_quest(SessionLocal, userInfo):
    with SessionLocal() as session:
        userQuest_stmt = text("INSERT INTO user_quest (user_id, template_id, parameters) VALUES (:user_id, :template_id, :parameter)")
        session.execute(userQuest_stmt, {"user_id": userInfo.user_id, "template_id": userInfo.template_id, 
                                                "parameter": json.dumps(userInfo.parameter)})
        session.commit()
    return {"message": "reached", "data": ""}

def delete_user_quest(SessionLocal, userInfo):
    with SessionLocal() as session:
        userQuest_stmt = text("DELETE FROM user_quest WHERE template_id = :template_id AND user_id = :user_id")
        session.execute(userQuest_stmt, {"template_id": userInfo.template_id, "user_id": userInfo.user_id})
        session.commit()
    return {"message": "reached", "data": ""}

def update_user_quest(SessionLocal, userInfo):
    with SessionLocal() as session:
        userQuest_stmt = text("""
            UPDATE user_quest_log
            SET progress_data = :progress_data
            WHERE user_id = :user_id
            AND template_id = :template_id
        """)

        session.execute(userQuest_stmt, {
            "progress_data": json.dumps(userInfo.parameter),
            "user_id": userInfo.user_id,
            "template_id": userInfo.template_id
        })  
        session.commit()
    return {"message": "reached", "data": ""}
