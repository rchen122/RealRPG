CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,

    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    streak INT DEFAULT 0
); -- USER PROFILE

CREATE TABLE quest_template (
    id SERIAL PRIMARY KEY,
    quest_name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    parameter_schema JSONB NOT NULL
); -- QUEST TEMPLATES WITH SPECIFIC QUEST INFORMATION

CREATE TABLE user_quest (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    template_id INT REFERENCES quest_template(id) ON DELETE CASCADE,
    parameters JSONB NOT NULL
); -- QUESTS LINKED TO EACH USER

CREATE TABLE user_quest_log (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    template_id INT REFERENCES quest_template(id) ON DELETE CASCADE,
    quest_date DATE DEFAULT now(),
    completed BOOLEAN DEFAULT FALSE,
    progress_data JSONB,
    CONSTRAINT uq_unique_log_per_day UNIQUE (user_id, template_id, quest_date)
); -- LOGS DAILY QUESTS FOR HISTORY





-- Parameter Schema should be in format: Name, Unit, Datatype
-- For example, Duration, Minutes, int
INSERT INTO quest_template (quest_name, description, parameter_schema) 
VALUES 
-- 1. Read a Book
('Read a Book', 
 'This quest is for building a daily reading habit by committing to a target duration.', 
 '{"Name": "Duration", "Unit": "minutes", "Datatype": "value"}'::jsonb),

-- 2. Journal Daily
('Journal Daily', 
 'This quest encourages daily journaling to promote reflection and mindfulness.', 
 '{"Name": "Number", "Unit": "words", "Datatype": "value"}'::jsonb),



-- 4. Hydration
('Hydration', 
 'Drink a target amount of water daily to maintain proper hydration.', 
 '{"Name": "Amount", "Unit": "mL", "Datatype": "value"}'::jsonb),

-- 5. Stretching
('Stretching', 
 'Stretch for a set duration daily to improve flexibility and reduce tension.', 
 '{"Name": "Duration", "Unit": "minutes", "Datatype": "value"}'::jsonb),

-- 6. Sleep Duration
('Sleep Duration', 
 'Track your sleep and aim to get a minimum number of hours each night.', 
 '{"Name": "Duration", "Unit": "hours", "Datatype": "value"}'::jsonb),

-- 7. Wake up time
('Wake Up', 'Track wake up time', 
'{"Name": "Time", "Unit": "HH:MM", "Datatype": "bool"}'::jsonb), -- VERIFY

-- 8. Cardio
('Cardio', 'Track cardio mileage for the day', 
'{"Name": "Amount", "Unit": "miles", "Datatype": "value"}'::jsonb);