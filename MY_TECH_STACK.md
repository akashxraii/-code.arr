# code.arr — Tech Stack Reference

> Personal reference to understand every technology used in this project, how it works, and where to find it in the code.

---

## Architecture Overview

The project is a **monorepo** with three independent Node.js packages managed by a root `package.json` that provides convenience scripts like `npm run dev:frontend`.

```
code.arr/
├── frontend/    → React SPA (Vite + Monaco Editor)
├── backend/     → Express REST API (auth, problems, code execution, interviews)
├── worker/      → BullMQ background worker (submission judging)
├── docker-compose.yml → PostgreSQL + Redis containers
└── .env         → Shared environment variables
```

**Request flow:** Browser → Frontend (Vite dev server :5173) → Backend API (:5000) → PostgreSQL / Redis → Worker picks up queued jobs → Docker sandbox runs user code → Worker writes verdict back to PostgreSQL.

---

## Layer 1 — Frontend

### React 19 (`react`, `react-dom`)

- **What:** The UI library. Every page and component is a React function component using hooks.
- **Where:**
  - Entry point: `frontend/src/main.jsx` (L7–L13) — `createRoot` renders the `<App />` inside `<StrictMode>` and `<BrowserRouter>`.
  - All pages under `frontend/src/pages/` are React components (e.g., `Home.jsx`, `Workspace.jsx`, `InterviewRoom.jsx`).
  - Hooks used throughout: `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`.
- **Why it matters:** React handles all rendering, state management, and UI updates. There is no external state library — all state lives in component-level `useState`/`useRef`.

### Vite 7 (`vite`, `@vitejs/plugin-react`)

- **What:** The frontend build tool and dev server. Replaces Webpack/CRA with near-instant hot module replacement.
- **Where:**
  - Config: `frontend/vite.config.js` (L1–L6) — minimal config, just enables the React plugin.
  - Scripts: `frontend/package.json` L7 — `"dev": "vite"`, `"build": "vite build"`.
  - Environment variables: `frontend/src/api.js` L1 — `import.meta.env.VITE_API_URL` reads the backend URL from `.env`.
- **Why it matters:** `import.meta.env` is Vite's way of injecting env vars at build time. Only vars prefixed with `VITE_` are exposed to the browser.

### React Router DOM 7 (`react-router-dom`)

- **What:** Client-side routing. Makes the SPA navigate between pages without full page reloads.
- **Where:**
  - `frontend/src/main.jsx` L3, L9 — wraps the app in `<BrowserRouter>`.
  - `frontend/src/App.jsx` L1, L26–L35 — `<Routes>` and `<Route>` define every URL path.
  - `frontend/src/components/Navbar.jsx` L1 — uses `NavLink` for active-link styling.
  - Pages use `useParams()` (e.g., `Workspace.jsx` L53 for `:slug`), `useNavigate()` (e.g., `Login.jsx` L6), and `Link` for navigation.
- **Key routes:** `/` → Home, `/login` → Login, `/problems` → Problems list, `/problems/:slug` → Workspace, `/interview` → Setup, `/interview/room/:id` → Live interview.

### Monaco Editor (`@monaco-editor/react`, `monaco-editor`)

- **What:** The same code editor that powers VS Code, embedded in the browser for writing solutions.
- **Where:**
  - `frontend/src/pages/Workspace.jsx` L1 — `import Editor from '@monaco-editor/react'`.
  - `Workspace.jsx` L297–L318 — the `<Editor>` component with options: dark/light theme toggle, language selection, minimap disabled, custom font, auto-layout.
  - `frontend/src/data/workspaceLanguages.js` — defines the 6 supported languages and their Monaco language IDs (L1–L8), plus typed starter code templates for each.
- **Why it matters:** Monaco gives syntax highlighting, autocomplete, and a professional editor feel. The `language` prop tells Monaco which grammar to use (e.g., `'javascript'`, `'python'`, `'cpp'`).

### Vanilla CSS

- **What:** All styling is hand-written CSS — no Tailwind, no CSS-in-JS.
- **Where:**
  - `frontend/src/index.css` — global resets, typography (Inter font), button/input base styles.
  - `frontend/src/App.css` (42 KB) — all component styles: navbar, home page, problems page, workspace, interview room, auth page, etc.
- **Key patterns:** CSS custom properties (`--question-panel-width` in `Workspace.jsx` L172), class-based theming (`workspace-dark-mode` toggled on `<body>` in `Workspace.jsx` L77), CSS animations for the AI orb.

### Browser APIs (used directly, no npm package)

| API | Where | What it does |
|-----|-------|--------------|
| `fetch` | `frontend/src/api.js` L27 | All API calls to the backend |
| `localStorage` | `api.js` L4, `Workspace.jsx` L64/L101/L119 | Stores JWT token, editor code drafts, theme preference, panel width |
| `sessionStorage` | `InterviewSetup.jsx` L37, `InterviewRoom.jsx` L67/L373 | Stores interview setup data and timer start between page navigations |
| `navigator.mediaDevices.getUserMedia` | `InterviewPermissions.jsx` L20, `InterviewRoom.jsx` L265 | Requests camera + microphone access for the interview |
| `SpeechRecognition` (Web Speech API) | `InterviewRoom.jsx` L19–L26 | Converts the user's spoken answers into text during the live interview |
| `Audio` / `URL.createObjectURL` | `InterviewRoom.jsx` L309–L310 | Plays the ElevenLabs TTS audio blob for the AI interviewer's voice |
| `FormData` | `InterviewSetup.jsx` L31, `api.js` L19 | Uploads the resume file as multipart form data |

### ESLint 9 (`eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)

- **What:** Linting for code quality. Enforces React hook rules and catches unused variables.
- **Where:** `frontend/eslint.config.js` — flat config format (ESLint 9 style). Run with `npm run lint`.

### Vercel Deployment Config

- **What:** `frontend/vercel.json` configures security headers for the production frontend.
- **Where:** `frontend/vercel.json` L1–L25.
- **Headers set:** Content-Security-Policy (report-only), X-Content-Type-Options, Referrer-Policy, Permissions-Policy (restricts camera/mic to self).

---

## Layer 2 — Backend

### Node.js (CommonJS)

- **What:** The runtime for the backend and worker. Uses `require()` / `module.exports` (CommonJS, not ESM).
- **Where:** `backend/package.json` L6 — `"type": "commonjs"`. Entry: `backend/server.js` → `backend/src/index.js` → `backend/src/app.js`.

### Express 5 (`express`)

- **What:** The HTTP framework. Handles routing, middleware, request/response lifecycle.
- **Where:**
  - `backend/src/app.js` L1, L13 — creates the Express app.
  - Route mounting: `app.js` L33–L38 — mounts 6 route modules under `/api/`.
  - JSON body parsing: `app.js` L27 — `express.json({ limit: '1mb' })`.
  - Error handler: `app.js` L40–L52 — catches CORS errors, file size limits, resume format errors, and generic 500s.
- **Route modules:** `auth.js`, `problems.js`, `run.js`, `submissions.js`, `resumes.js`, `interviews.js` — all in `backend/src/routes/`.

### JSON Web Tokens (`jsonwebtoken`)

- **What:** Authentication. After login/register, the server signs a JWT containing user id, username, email, and role. The frontend stores it in localStorage and sends it as `Authorization: Bearer <token>` on every request.
- **Where:**
  - Signing: `backend/src/routes/auth.js` L13–L24 — `jwt.sign()` with `config.jwtSecret` and a 2-hour expiry.
  - Verifying: `backend/src/middleware/auth.js` L6–L13 — extracts the Bearer token from the header, calls `jwt.verify()`, and puts the decoded user on `req.user`.
  - Config requirement: `backend/src/config.js` L21 — `jwtSecret: requireEnv('JWT_SECRET')` crashes the server on startup if JWT_SECRET is missing.

### Helmet (`helmet`)

- **What:** Sets security-related HTTP headers automatically (X-Frame-Options, X-XSS-Protection, etc.).
- **Where:** `backend/src/app.js` L15–L18 — `app.use(helmet(...))` with CSP and COEP disabled (Monaco needs eval).

### CORS (`cors`)

- **What:** Controls which frontend origins can call the API.
- **Where:** `backend/src/app.js` L19–L26 — origin whitelist from `FRONTEND_URL` env var (defaults to `http://localhost:5173`). Rejects unknown origins with a 403.

### express-rate-limit (`express-rate-limit`)

- **What:** Prevents abuse by limiting how many requests a client can make per time window.
- **Where:** `backend/src/middleware/rateLimits.js` — defines 5 rate limiters:
  - `authLimiter`: 20 requests per 15 min (login/register).
  - `runLimiter`: 20 requests per 1 min (code execution).
  - `submissionLimiter`: 10 requests per 1 min.
  - `uploadLimiter`: 10 requests per 15 min (resume upload).
  - `interviewLimiter`: 30 requests per 1 min.
- Applied per-route: e.g., `routes/auth.js` L26 — `router.post('/register', authLimiter, ...)`.

### Zod 4 (`zod`)

- **What:** Schema validation for request bodies. Rejects malformed input with structured error messages before it reaches business logic.
- **Where:**
  - Schemas: `backend/src/schemas.js` — defines `registerSchema`, `loginSchema`, `runSchema`, `submissionSchema`, `problemCreateSchema`, `interviewCreateSchema`, `interviewAnswerSchema`.
  - Middleware: `backend/src/middleware/validate.js` L3–L20 — `validateBody(schema)` parses `req.body` with the Zod schema, returns 400 with error details on failure.
  - Example validation: `schemas.js` L21 — username must be 3–50 chars matching `^[A-Za-z0-9_.-]+$`. Language must be one of `SUPPORTED_LANGUAGES` (L5). Code max length is 30,000 chars.

### Multer (`multer`)

- **What:** Middleware for handling `multipart/form-data` file uploads (resumes).
- **Where:** `backend/src/routes/resumes.js` L2, L16–L27.
  - Uses `multer.memoryStorage()` — file stays in RAM as a Buffer, never written to disk.
  - File size limit: 2 MB (`limits: { fileSize: 2 * 1024 * 1024 }`).
  - File filter: only allows `.pdf`, `.docx`, `.txt` by extension AND MIME type.

### Password Hashing (Node.js `crypto` — no npm package)

- **What:** PBKDF2-based password hashing with random salt. No bcrypt dependency.
- **Where:** `backend/src/services/password.js`.
  - `hashPassword()` L3–L6: generates 16 random bytes as salt, runs 120,000 iterations of PBKDF2-SHA512, stores `salt:hash`.
  - `verifyPassword()` L9–L14: re-derives the hash and compares using `crypto.timingSafeEqual` (prevents timing attacks).

### Resume Parsing (`pdf-parse`, `mammoth`)

- **What:** Extracts plain text from uploaded resume files.
- **Where:** `backend/src/services/resumeParser.js`.
  - `pdf-parse` (L2): extracts text from PDF files via `PDFParse` class (L41–L49).
  - `mammoth` (L1): extracts raw text from DOCX files via `mammoth.extractRawText()` (L52–L54).
  - TXT files: read directly from the buffer (L72).
  - Security: magic byte validation (L24–L39) — checks `%PDF` header for PDFs, `PK` header for DOCX, no null bytes for TXT.
  - Text is normalized and capped at 20,000 characters (L95).

### dotenv (`dotenv`)

- **What:** Loads `.env` file variables into `process.env`.
- **Where:** `backend/src/config.js` L3–L4 — loads from both project root and local directory. Also loaded in `db/index.js` L4, `db/init.js` L6, and `worker/src/worker.js` L4.

### PostgreSQL Driver (`pg`)

- **What:** The Node.js client for PostgreSQL. Uses connection pooling.
- **Where:**
  - Pool creation: `backend/src/db/index.js` L1, L9–L11 — `new Pool({ connectionString: process.env.DATABASE_URL })`.
  - Graceful fallback: if `DATABASE_URL` is not set, `pool` is `null` and the `requireDatabase` middleware returns 503 (L13–L21).
  - All queries use parameterized queries (`$1`, `$2`, ...) to prevent SQL injection.
  - Used in every route file for database reads/writes.

### Code Runner (Node.js `child_process` + Docker CLI)

- **What:** The most complex service. Executes user-submitted code in 6 languages inside Docker containers.
- **Where:** `backend/src/services/codeRunner.js` (1,419 lines).
- **Supported languages:** JavaScript, Python, Java, C++, C, Go (L8).
- **How it works:**
  1. Wraps user code in a language-specific harness that handles I/O and typed arguments.
  2. Writes the wrapped code to a temp directory (`withTempDir`, L239–L246).
  3. Either runs locally via `child_process.spawn` (`runProcess`, L87–L138) or inside Docker (`runDockerProcess`, L148–L230).
  4. Docker mode (default): creates an isolated container with `--network none`, `--memory 128m`, `--cpus 0.5`, `--read-only`, `--cap-drop ALL`, `--no-new-privileges` (L152–L176).
  5. Compares actual output against expected output using normalized string comparison (L1379).
- **Docker images per language:** `node:22-alpine`, `python:3.12-alpine`, `eclipse-temurin:17-jdk-jammy`, `gcc:14`, `golang:1.23-alpine` (L9–L16).
- **Typed problem support:** For problems with function signatures (not just `solve(input)`), the runner generates wrappers that parse input, call the user's function, and serialize the output. Supports complex types: `ListNode`, `TreeNode`, `Node` (graph), arrays, matrices (L248–L345 for JS helpers).

---

## Layer 3 — Worker

### BullMQ (`bullmq`)

- **What:** A Redis-backed job queue. When a user submits code, the backend adds a job to the `submissions` queue. The worker process picks it up and runs the code.
- **Where:**
  - **Producer (backend):** `backend/src/routes/submissions.js` L2, L13–L23 — creates a `Queue('submissions')`, adds a `'judge'` job with submission data (L57–L63).
  - **Consumer (worker):** `worker/src/worker.js` L1, L18–L46 — creates a `Worker('submissions')` that processes jobs with `concurrency: 2`.
- **Job lifecycle:**
  1. Backend inserts submission with `status: 'pending'` into PostgreSQL.
  2. Backend adds a BullMQ job with `{ submissionId, language, code, tests, problem }`.
  3. Worker picks up the job, sets `status: 'running'` in DB (L23–L26).
  4. Worker calls `judgeSubmission()` from `codeRunner.js` (imported via `worker/src/runner.js` L1).
  5. Worker updates the submission with the verdict (`accepted`, `wrong_answer`, or `runtime_error`) and runtime (L30–L33).

### Why a separate worker?

The worker runs in its own process (`worker/src/worker.js`). This keeps user code execution completely separate from the API process. If a user's code crashes or hangs, it only affects the worker container, not the API serving other users.

---

## Layer 4 — Database

### PostgreSQL 15

- **What:** The relational database storing all persistent data.
- **Where:** `docker-compose.yml` L2–L13 — runs as a Docker container named `code_arr_db` on port 5432.
- **Schema:** `backend/src/db/schema.sql` — defines 8 tables:

| Table | Purpose | Key columns |
|-------|---------|-------------|
| `users` | User accounts | id, username, email, password_hash, role |
| `languages` | Supported coding languages | name, runtime, enabled |
| `problems` | Coding problems | slug, title, description, difficulty, tags[], starter_code (JSONB), function_name, input_signature (JSONB), examples (JSONB), constraints[] |
| `test_cases` | Test inputs/outputs per problem | problem_id (FK), input, expected_output, is_sample |
| `submissions` | User code submissions | user_id (FK), problem_id (FK), language, code, status, runtime, error |
| `resumes` | Uploaded CVs | user_id (FK), filename, mime_type, extracted_text |
| `interview_sessions` | AI interview sessions | user_id (FK), resume_id (FK), domain, status, current_question |
| `interview_messages` | Conversation history | session_id (FK), role (ai/user/system), content, event_type |
| `interview_feedback` | Post-interview scores | session_id (FK), strengths, improvements, summary, score |

- **Initialization:** `backend/src/db/init.js` reads `schema.sql`, runs it, then seeds problems from `problemCatalog.js` using upsert (`ON CONFLICT ... DO UPDATE`).
- **No ORM:** All queries are raw SQL with parameterized values via `pg`. No Prisma, no Sequelize.

### Redis 7

- **What:** In-memory data store used exclusively as the message broker for BullMQ.
- **Where:** `docker-compose.yml` L15–L20 — runs as a Docker container named `code_arr_redis` on port 6379.
- **Connection:** Both backend (`routes/submissions.js` L17) and worker (`worker.js` L13–L16) connect to Redis at `REDIS_HOST:REDIS_PORT`.

---

## Layer 5 — External APIs

### Google Gemini API (REST)

- **What:** The LLM that generates adaptive interview questions and feedback.
- **Where:** `backend/src/services/geminiClient.js`.
  - `askGemini()` (L66–L91): makes a `fetch` POST to `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent` with the API key as a query parameter.
  - Model: `process.env.GEMINI_MODEL` defaults to `gemini-2.5-flash` (L68).
  - `generateQuestion()` (L93–L116): builds a detailed prompt including domain, CV text, conversation history, latest answer, and silence status. Returns the AI's next question.
  - `generateFeedback()` (L118–L141): asks Gemini to return JSON with score (0–100), strengths, improvements, and summary.
- **Fallback:** If `GEMINI_API_KEY` is not set, `askGemini()` returns `null` and the system uses hardcoded fallback logic (`fallbackQuestion` L29–L53, `fallbackFeedback` L55–L64). This means the interview works without any API key — just with less adaptive questions.
- **Low-effort detection:** `isLowEffortAnswer()` (L3–L27) detects when user says just "hi", "ok", "idk" etc., and the AI asks them to give a real answer.

### ElevenLabs Text-to-Speech API (REST)

- **What:** Converts the AI interviewer's text questions into realistic spoken audio.
- **Where:** `backend/src/services/elevenLabsClient.js`.
  - `streamInterviewSpeech()` (L31–L76): POSTs to `https://api.elevenlabs.io/v1/text-to-speech/{voiceId}/stream` with the question text.
  - Returns a readable stream that the backend pipes directly to the HTTP response (`routes/interviews.js` L110–L114).
  - Voice settings: stability 0.45, similarity_boost 0.85, style 0.25 (L52–L57).
- **No fallback:** Unlike Gemini, if ElevenLabs is not configured, the interview room shows an error. There is no browser TTS fallback by design (avoids robotic voice).
- **Frontend playback:** `InterviewRoom.jsx` L306–L328 — fetches the audio blob, creates an `Audio` object via `URL.createObjectURL`, plays it, then starts listening for the user's answer when playback ends.

---

## Layer 6 — Infrastructure & DevOps

### Docker & Docker Compose

- **What:** Containers for local development services AND for sandboxed code execution.
- **Two separate uses:**
  1. **`docker-compose.yml`:** Runs PostgreSQL and Redis as development services.
  2. **Code Runner:** `codeRunner.js` L148–L230 spawns individual `docker run` commands per code execution with strict security: `--network none`, `--memory 128m`, `--cpus 0.5`, `--pids-limit 64`, `--read-only`, `--cap-drop ALL`, `--no-new-privileges`, `--user 1000:1000`.
- **Runner images:** Pre-pulled per language (see Layer 2 Code Runner section).

### Vercel (Frontend Hosting)

- **What:** The intended production host for the React SPA.
- **Where:** `frontend/vercel.json` — configures security headers. The backend is NOT deployed on Vercel — it needs a separate host (like Render) that supports Docker and long-running processes.

### Monorepo Scripts

- **Where:** Root `package.json` L6–L12.
- `install:all` — installs deps in all 3 packages.
- `dev:frontend`, `dev:backend`, `dev:worker` — starts each service.
- `build` — builds the frontend for production.
- `test` — runs backend tests, worker tests, and frontend lint.

---

## Layer 7 — Security

### Summary of security measures across the codebase:

| Concern | Implementation | File & Line |
|---------|---------------|-------------|
| Auth required on sensitive routes | JWT middleware on `/api/run`, `/api/submissions`, `/api/resumes`, `/api/interviews` | `middleware/auth.js` L4–L18 |
| Admin-only routes | `admin` middleware checks `req.user.role === 'admin'` | `middleware/admin.js` L1–L7 |
| SQL injection prevention | All queries use `$1, $2` parameterized values, never string concatenation | Every route file |
| Password storage | PBKDF2 with 120K iterations + random salt + timing-safe comparison | `services/password.js` |
| Rate limiting | 5 different limiters per route category | `middleware/rateLimits.js` |
| Request validation | Zod schemas reject bad input before any DB call | `middleware/validate.js` + `schemas.js` |
| CORS | Whitelist-only origin check | `app.js` L19–L26 |
| HTTP headers | Helmet sets security headers | `app.js` L15–L18 |
| File upload | Extension + MIME + magic byte checks, 2MB limit | `routes/resumes.js` + `services/resumeParser.js` |
| Code execution isolation | Docker sandbox with no network, mem/CPU/PID limits, read-only FS | `services/codeRunner.js` L148–L176 |
| Unsafe language rejection | Zod enum only allows the 6 supported languages | `schemas.js` L5 |
| Extracted text capped | Resume text limited to 20K chars before AI use | `services/resumeParser.js` L95 |
| CSP headers (production) | Report-only CSP in Vercel config | `frontend/vercel.json` L7–L8 |
| Camera/mic permission | Permissions-Policy header restricts to self only | `frontend/vercel.json` L19–L20 |

---

## Layer 8 — Testing

### Node.js Built-in Test Runner (`node:test`, `node:assert/strict`)

- **What:** Native Node.js testing — no Jest, no Mocha.
- **Where:** `backend/test/security.test.js` — 4 tests covering auth enforcement, language validation, file upload rejection, and tag sanitization.

### Supertest (`supertest`)

- **What:** Makes HTTP requests to the Express app in tests without starting a server.
- **Where:** `backend/test/security.test.js` L4 — `const request = require('supertest')`. Used to test actual API routes (e.g., L18 — `request(app).post('/api/run')`).

### Syntax Checking

- **Where:** `backend/package.json` L11 — the `test` script runs `node --check` on every source file to catch syntax errors, then runs the test files with `--test`.

---

## Quick Reference: All npm Packages

### Frontend (`frontend/package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.0 | UI library |
| `react-dom` | ^19.2.0 | React DOM renderer |
| `react-router-dom` | ^7.9.4 | Client-side routing |
| `@monaco-editor/react` | ^4.7.0 | Monaco Editor React wrapper |
| `monaco-editor` | ^0.53.0 | VS Code editor core |
| `vite` | ^7.1.12 | Build tool / dev server |
| `@vitejs/plugin-react` | ^5.0.4 | React support for Vite |
| `eslint` | ^9.38.0 | Linter |
| `eslint-plugin-react-hooks` | ^5.2.0 | Hook rules enforcement |
| `eslint-plugin-react-refresh` | ^0.4.24 | HMR component export rules |

### Backend (`backend/package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.1.0 | HTTP framework |
| `cors` | ^2.8.5 | Cross-origin request handling |
| `helmet` | ^8.2.0 | Security HTTP headers |
| `jsonwebtoken` | ^9.0.2 | JWT auth tokens |
| `express-rate-limit` | ^8.5.2 | Request rate limiting |
| `zod` | ^4.4.3 | Schema validation |
| `pg` | ^8.16.3 | PostgreSQL client |
| `bullmq` | ^5.76.6 | Job queue (producer side) |
| `multer` | ^2.0.2 | File upload handling |
| `pdf-parse` | ^2.4.5 | PDF text extraction |
| `mammoth` | ^1.12.0 | DOCX text extraction |
| `dotenv` | ^17.2.3 | Env file loading |
| `supertest` | ^7.2.2 | HTTP testing (dev only) |

### Worker (`worker/package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| `bullmq` | ^5.76.6 | Job queue (consumer side) |
| `pg` | ^8.16.3 | PostgreSQL client (update submission verdicts) |
| `dotenv` | ^17.2.3 | Env file loading |

---

## Environment Variables Cheat Sheet

From `.env.example`:

| Variable | Used by | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | Backend, Worker | PostgreSQL connection string |
| `REDIS_HOST` / `REDIS_PORT` | Backend, Worker | Redis for BullMQ |
| `JWT_SECRET` | Backend | Signs/verifies auth tokens — **required** |
| `JWT_EXPIRES_IN` | Backend | Token expiry (default: 2h) |
| `PORT` | Backend | API port (default: 5000) |
| `FRONTEND_URL` | Backend | CORS allowed origin (default: localhost:5173) |
| `VITE_API_URL` | Frontend | Backend URL for fetch calls |
| `CODE_RUNNER_MODE` | Backend | `docker` (default) or `process` (unsafe local fallback) |
| `RUNNER_MEMORY` / `RUNNER_CPUS` / `RUNNER_PIDS_LIMIT` | Backend | Docker container resource limits |
| `RUNNER_TIMEOUT_MS` | Backend | Max code execution time (default: 8000ms) |
| `GEMINI_API_KEY` | Backend | Google Gemini LLM key (optional — fallback exists) |
| `GEMINI_MODEL` | Backend | LLM model name (default: gemini-2.5-flash) |
| `ELEVENLABS_API_KEY` | Backend | TTS voice key (required for voice interviews) |
| `ELEVENLABS_VOICE_ID` | Backend | Which ElevenLabs voice to use |
| `ELEVENLABS_MODEL_ID` | Backend | TTS model (default: eleven_multilingual_v2) |
| `ELEVENLABS_OUTPUT_FORMAT` | Backend | Audio format (default: mp3_44100_128) |
