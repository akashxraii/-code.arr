# code.arr Security Changes

This file documents the security hardening changes made to the project, with a before/after explanation of how the code worked and how it works now.

## 1. Code Runner Isolation

### Before

- User code was executed directly from the backend/worker environment.
- JavaScript used Node's `vm` module inside the same Node.js process.
- Python, Java, C, C++, and Go were run as local OS processes through `spawn`.
- Execution had a timeout and temporary directory cleanup, but user code still had access to the host runtime environment.
- There was no container boundary, no network block, no memory limit, no PID limit, and no read-only filesystem.

### After

- User code now runs through Docker by default.
- Each code run gets a temporary workspace mounted into an isolated container.
- Containers run with:
  - no network access,
  - memory limit,
  - CPU limit,
  - PID limit,
  - read-only root filesystem,
  - dropped Linux capabilities,
  - `no-new-privileges`,
  - non-root user,
  - automatic container cleanup.
- JavaScript is no longer executed with `vm`; it is written to a wrapper file and executed inside the Docker sandbox.
- `CODE_RUNNER_MODE=process` still exists as an explicit local fallback, but Docker mode is the default.
- Timeout cleanup now force-removes timed-out runner containers so they do not keep running in the background.

Changed files:

- `backend/src/services/codeRunner.js`
- `worker/src/runner.js`

## 2. Auth Requirement For Running Code

### Before

- `/api/run` could be called without authentication.
- Anyone who could reach the backend could ask the server to execute code against problem tests.

### After

- `/api/run` now requires a valid JWT.
- Unsupported languages and oversized code are rejected before execution.
- `/api/submissions` remains authenticated and now shares the same language/code validation rules.

Changed files:

- `backend/src/routes/run.js`
- `backend/src/routes/submissions.js`
- `backend/src/schemas.js`

## 3. JWT Secret Handling

### Before

- Auth used `process.env.JWT_SECRET || 'dev-secret'`.
- If `JWT_SECRET` was missing, the app silently used a predictable fallback secret.
- Tokens lasted 7 days.

### After

- The backend fails startup if `JWT_SECRET` is missing.
- JWT signing and verification both use the required config value.
- Token expiry defaults to `2h`, configurable through `JWT_EXPIRES_IN`.

Changed files:

- `backend/src/config.js`
- `backend/src/routes/auth.js`
- `backend/src/middleware/auth.js`
- `.env.example`

## 4. Express App Security Middleware

### Before

- The backend used permissive CORS with `process.env.FRONTEND_URL || true`.
- There were no Helmet security headers.
- There were no route-level rate limits.
- Request body validation was manual and inconsistent.
- The server app and listener were tied together, making API tests harder.

### After

- Express app setup now lives in `backend/src/app.js`.
- Server startup now lives in `backend/src/index.js`.
- Helmet is enabled for baseline HTTP security headers.
- CORS now only allows configured frontend origins.
- Route-level rate limits protect auth, code execution, submissions, uploads, and interview endpoints.
- Zod schemas validate request bodies and return structured `400` responses.
- Error handling now returns safe responses for CORS errors, upload size errors, and unsupported resume uploads.

Changed files:

- `backend/src/app.js`
- `backend/src/index.js`
- `backend/src/config.js`
- `backend/src/middleware/rateLimits.js`
- `backend/src/middleware/validate.js`
- `backend/src/schemas.js`

## 5. Auth Route Validation And Rate Limits

### Before

- Register/login checked only whether fields were present.
- Email format, username shape, password length, and field sizes were not consistently validated.
- Login/register had no rate limit.

### After

- Register/login use Zod schemas.
- Username, email, and password inputs have size and format rules.
- Auth endpoints use a rate limiter to slow brute-force attempts.

Changed files:

- `backend/src/routes/auth.js`
- `backend/src/schemas.js`
- `backend/src/middleware/rateLimits.js`

## 6. Problem, Submission, And Interview Validation

### Before

- Some routes manually checked required fields.
- Admin problem creation accepted loosely shaped request bodies.
- Interview answers and setup fields had minimal validation.

### After

- Problem creation, run requests, submissions, interview creation, and interview answers use Zod schemas.
- Language values are allowlisted.
- Code length is capped.
- Problem slugs, function names, signatures, tags, examples, and test cases are constrained.
- Interview domain, resume ID, and answers are validated before route logic runs.

Changed files:

- `backend/src/routes/problems.js`
- `backend/src/routes/run.js`
- `backend/src/routes/submissions.js`
- `backend/src/routes/interviews.js`
- `backend/src/schemas.js`

## 7. Resume Upload Hardening

### Before

- Uploads used memory storage and a 2 MB limit.
- Resume parsing accepted PDF, DOCX, and TXT based mainly on extension/MIME checks inside the parser.
- Extracted text was stored in full.

### After

- Uploads are filtered before parsing.
- Only PDF, DOCX, and TXT are allowed.
- Extension and MIME type must both match an allowed format.
- The parser checks basic file signatures:
  - PDF must start with `%PDF`,
  - DOCX must start with ZIP bytes,
  - TXT must not contain null bytes.
- Extracted resume text is capped before storage or AI prompt use.
- Upload errors return safe `400` responses.

Changed files:

- `backend/src/routes/resumes.js`
- `backend/src/services/resumeParser.js`
- `backend/src/app.js`

## 8. Frontend Deployment Headers

### Before

- The frontend did not include deployment response headers.
- There was no CSP rollout configuration.

### After

- `frontend/vercel.json` adds production headers for Vercel.
- A report-only Content Security Policy is included so Monaco can be verified before enforcing CSP.
- Extra headers include:
  - `X-Content-Type-Options: nosniff`,
  - `Referrer-Policy: strict-origin-when-cross-origin`,
  - `Permissions-Policy` for camera and microphone.

Changed files:

- `frontend/vercel.json`

## 9. Dependency Security

### Before

- Backend audit reported a moderate `qs` advisory.
- Frontend audit reported moderate `dompurify` advisories through `monaco-editor`.

### After

- Backend dependencies were refreshed and now audit clean.
- Frontend Monaco dependency was changed to a version path that removes the vulnerable DOMPurify dependency.
- Backend, frontend, and worker audits all report `0 vulnerabilities`.

Changed files:

- `backend/package.json`
- `backend/package-lock.json`
- `frontend/package.json`
- `frontend/package-lock.json`

## 10. Environment Template

### Before

- The project had a local `.env`, but no safe `.env.example`.
- New setup required guessing which variables were needed.

### After

- `.env.example` documents safe placeholder values.
- It includes database, Redis, JWT, frontend URL, runner mode, runner limits, Gemini, and ElevenLabs settings.
- Real secrets stay in ignored `.env` or production host secret managers.

Changed files:

- `.env.example`

## 11. Tests

### Before

- Backend tests were mostly syntax checks through `node --check`.
- There were no API-level security tests.

### After

- Added API security tests using Node's test runner and Supertest.
- Current tests cover:
  - `/api/run` requires authentication,
  - unsupported languages are rejected before execution,
  - unsupported resume files are rejected,
  - oversized resume files are rejected.
- Backend test script now runs syntax checks and API tests.

Changed files:

- `backend/test/security.test.js`
- `backend/package.json`
- `backend/package-lock.json`

## 12. Documentation Updates

### Before

- Markdown briefs described the intended platform and older MVP security direction.
- Some docs still said Docker isolation should be added later.

### After

- Docs now describe the current security baseline.
- Updated docs mention:
  - Docker sandboxing is now default,
  - `/api/run` requires auth,
  - Helmet/CORS/rate-limit/Zod controls,
  - resume upload hardening,
  - Vercel report-only CSP,
  - deployment separation for frontend, API, worker, Redis, and PostgreSQL.

Changed files:

- `README.md`
- `PROJECT_BRIEF.md`
- `TECH_STACK_OVERVIEW.md`
- `PAGES.md`

## 13. Verification Performed

The following checks were run successfully:

```powershell
npm test --prefix backend
npm test --prefix worker
npm run lint --prefix frontend
npm audit --prefix backend
npm audit --prefix frontend
npm audit --prefix worker
```

Frontend production build was also verified using a temporary output directory so tracked `frontend/dist` files were not changed.

Docker sandbox checks were also performed:

- simple JavaScript solution succeeded inside Docker,
- infinite loop timed out,
- timeout cleanup left no `code-arr-runner` containers running.
