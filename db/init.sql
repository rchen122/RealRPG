CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    hashed_password VARCHAR(100) NOT NULL,

    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    streak INT DEFAULT 0
); -- USER PROFILE

CREATE TABLE quest_template (
    id SERIAL PRIMARY KEY,
    quest_name VARCHAR(50),
    description TEXT,
    parameter_schema JSONB
); -- QUEST TEMPLATES WITH SPECIFIC QUEST INFORMATION

CREATE TABLE user_quest (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    template_id INT REFERENCES quest_template(id),
    active BOOLEAN NOT NULL,
    parameter JSONB
); -- QUESTS LINKED TO EACH USER

CREATE TABLE user_quest_log (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    template_id INT REFERENCES quest_template(id),
    date TIMESTAMP NOT NULL,
    completed BOOLEAN NOT NULL,
    progress_data JSONB
); -- LOGS DAILY QUESTS FOR HISTORY

INSERT INTO users (email, username, hashed_password, full_name)
VALUES ('raymondchen1221@gmail.com', 'rchen122', 'password1234', 'Raymond Chen');

-- Parameter Schema should be in format: Name, Unit, Datatype
-- For example, Duration, Minutes, int
INSERT INTO quest_template (quest_name, description, parameter_schema) 
VALUES 
-- 1. Read a Book
('Read a Book', 
 'This quest is for building a daily reading habit by committing to a target duration.', 
 '{"Name": "Duration", "Unit": "minutes", "Datatype": "int"}'::jsonb),

-- 2. Journal Daily
('Journal Daily', 
 'This quest encourages daily journaling to promote reflection and mindfulness.', 
 '{"Name": "Number", "Unit": "words", "Datatype": "int"}'::jsonb),

-- 3. Pomodoro Focus Sessions
-- ('Pomodoro Focus Sessions', 
--  'Complete a number of Pomodoro-style focused work sessions to increase productivity.', 
--  '{"session_length": 25, "target_sessions": 4}'::jsonb),

-- 4. Hydration
('Hydration', 
 'Drink a target amount of water daily to maintain proper hydration.', 
 '{"Name": "Amount", "Unit": "mL", "Datatype": "int"}'::jsonb),

-- 5. Stretching
('Stretching', 
 'Stretch for a set duration daily to improve flexibility and reduce tension.', 
 '{"Name": "Duration", "Unit": "minutes", "Datatype": "int"}'::jsonb),

-- 6. Sleep Duration
('Sleep Duration', 
 'Track your sleep and aim to get a minimum number of hours each night.', 
 '{"Name": "Duration", "Unit": "hours", "Datatype": "float"}'::jsonb),

-- 7. Wake up time
('Wake Up', 'Track wake up time', 
'{"Name": "Time", "Unit": "HH:MM", "Datatype": "datetime"}'::jsonb), -- VERIFY

-- 8. Cardio
('Cardio', 'Track cardio mileage for the day', 
'{"Name": "Amount", "Unit": "miles", "Datatype": "float"}'::jsonb);