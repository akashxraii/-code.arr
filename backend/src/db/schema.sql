CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS languages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) UNIQUE NOT NULL,
  runtime VARCHAR(40) NOT NULL,
  enabled BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS problems (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  starter_code JSONB DEFAULT '{}',
  function_name VARCHAR(80) DEFAULT 'solve',
  time_limit INTEGER DEFAULT 1000,
  memory_limit INTEGER DEFAULT 128,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test_cases (
  id SERIAL PRIMARY KEY,
  problem_id INTEGER REFERENCES problems(id) ON DELETE CASCADE,
  input TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  is_sample BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  problem_id INTEGER REFERENCES problems(id) ON DELETE CASCADE,
  language VARCHAR(40) NOT NULL,
  code TEXT NOT NULL,
  status VARCHAR(40) DEFAULT 'pending',
  runtime INTEGER,
  memory INTEGER,
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resumes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  mime_type TEXT,
  extracted_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interview_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resume_id INTEGER REFERENCES resumes(id) ON DELETE SET NULL,
  domain VARCHAR(80) NOT NULL,
  status VARCHAR(30) DEFAULT 'setup',
  current_question TEXT,
  started_at TIMESTAMP,
  finished_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interview_messages (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES interview_sessions(id) ON DELETE CASCADE,
  role VARCHAR(20) CHECK (role IN ('ai', 'user', 'system')) NOT NULL,
  content TEXT NOT NULL,
  event_type VARCHAR(40) DEFAULT 'message',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interview_feedback (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES interview_sessions(id) ON DELETE CASCADE,
  strengths TEXT,
  improvements TEXT,
  summary TEXT,
  score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO languages (name, runtime)
VALUES
  ('javascript', 'node'),
  ('python', 'python'),
  ('java', 'java')
ON CONFLICT (name) DO NOTHING;

INSERT INTO problems (slug, title, description, difficulty, tags, starter_code, function_name)
VALUES (
  'two-sum',
  'Two Sum',
  'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  'easy',
  ARRAY['Array', 'Hash Table'],
  '{"javascript":"function solve(input) {\n  const lines = input.trim().split(/\\n/);\n  const nums = JSON.parse(lines[0].replace(\"nums = \", \"\"));\n  const target = Number(lines[1].replace(\"target = \", \"\"));\n  const seen = new Map();\n\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return JSON.stringify([seen.get(need), i]);\n    seen.set(nums[i], i);\n  }\n}\n"}',
  'solve'
)
ON CONFLICT (slug) DO NOTHING;

WITH two_sum AS (
  SELECT id FROM problems WHERE slug = 'two-sum'
)
INSERT INTO test_cases (problem_id, input, expected_output, is_sample)
SELECT two_sum.id, seed.input, seed.expected_output, seed.is_sample
FROM two_sum
CROSS JOIN (
  VALUES
    ('nums = [2,7,11,15]' || E'\n' || 'target = 9', '[0,1]', true),
    ('nums = [3,2,4]' || E'\n' || 'target = 6', '[1,2]', true),
    ('nums = [3,3]' || E'\n' || 'target = 6', '[0,1]', true),
    ('nums = [0,4,3,0]' || E'\n' || 'target = 0', '[0,3]', false)
) AS seed(input, expected_output, is_sample)
WHERE NOT EXISTS (
  SELECT 1 FROM test_cases
  WHERE test_cases.problem_id = two_sum.id
    AND test_cases.input = seed.input
);
