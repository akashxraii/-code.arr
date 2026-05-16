# {}code.arr Platform

{}code.arr is a LeetCode/HackerRank-style coding practice platform with a mandatory AI mock interview module.

## Structure

- `frontend` - React + Vite app with Monaco Editor and AI interview screens.
- `backend` - Express API for auth, problems, submissions, resumes, and interviews.
- `worker` - BullMQ worker for judging queued submissions.
- `docker-compose.yml` - PostgreSQL and Redis for local development.

## Quick Start

1. Copy `.env.example` to `.env` in the root, `backend`, and `worker` as needed.
2. Start services with `docker compose up -d`.
3. Install dependencies with `npm run install:all`.
4. Run the backend with `npm run dev:backend`.
5. Run the worker with `npm run dev:worker`.
6. Run the frontend with `npm run dev:frontend`.

The AI interview works without a Gemini key by using a local fallback interviewer. Add `GEMINI_API_KEY` when you want real adaptive LLM responses.
