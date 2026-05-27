# code.arr Platform

code.arr is a coding practice platform with a mandatory AI mock interview module and a Docker-isolated local code runner.

## Structure

- `frontend` - React + Vite app with Monaco Editor and AI interview screens.
- `backend` - Express API for auth, problems, submissions, resumes, and interviews.
- `worker` - BullMQ worker for judging queued submissions.
- `docker-compose.yml` - PostgreSQL and Redis for local development.
- `.env.example` - safe local configuration template with no real secrets.

## Quick Start

1. Copy `.env.example` to `.env` at the project root and replace `JWT_SECRET` with a long random value.
2. Start services with `docker compose up -d`.
3. Install dependencies with `npm run install:all`.
4. Initialize the database with `npm run db:init --prefix backend`.
5. Pre-pull the common runner images with `docker pull node:22-alpine` and `docker pull eclipse-temurin:17-jdk-jammy`.
6. Run the backend with `npm run dev:backend`.
7. Run the worker with `npm run dev:worker`.
8. Run the frontend with `npm run dev:frontend`.

## Security Notes

- `/api/run` and submissions require authentication.
- User code runs through Docker by default (`CODE_RUNNER_MODE=docker`) with no network, memory/CPU/PID limits, a read-only container root filesystem, and per-run cleanup.
- Runner timeout defaults to `RUNNER_TIMEOUT_MS=8000`, which gives Dockerized compiled languages enough time to compile and run locally.
- `CODE_RUNNER_MODE=process` exists only as an explicit local fallback and should not be used for untrusted users.
- Backend requests use strict CORS, Helmet headers, rate limits, and Zod validation.
- Resume uploads are limited to PDF, DOCX, or TXT, capped at 2 MB, checked by extension/MIME/magic bytes, and extracted text is capped before storage/AI use.
- Vercel headers in `frontend/vercel.json` enable a report-only CSP that can be tightened after Monaco is verified in production.

## Checks

```powershell
npm test --prefix backend
npm test --prefix worker
npm run lint --prefix frontend
npm run build --prefix frontend
npm audit --prefix backend
npm audit --prefix frontend
npm audit --prefix worker
```

The AI interview works without a Gemini key by using a local fallback interviewer. Add `GEMINI_API_KEY` when you want real adaptive LLM responses.

## AI Interview Voice

The live interview room uses ElevenLabs for interviewer text-to-speech. Add these values to your backend environment before starting an interview:

- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`
- `ELEVENLABS_MODEL_ID` (optional, defaults to `eleven_multilingual_v2`)
- `ELEVENLABS_OUTPUT_FORMAT` (optional, defaults to `mp3_44100_128`)

If ElevenLabs is not configured, the interview room shows a voice configuration error instead of falling back to the browser's robotic speech voice.
