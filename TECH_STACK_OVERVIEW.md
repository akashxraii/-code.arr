# code.arr Tech Stack Overview

## Project Context

code.arr is a coding practice and interview preparation platform. Users can solve coding problems, run and submit code, track progress, and use a mandatory AI mock interview section that asks personalized questions using the user's selected domain, CV, and live interview answers.

The reference project in `D:\TCode` already shows a useful direction for the architecture: a React frontend, an Express backend, PostgreSQL for data storage, Redis with BullMQ for submission queues, and a separate worker for judging code submissions.

This document explains the technology stack that will be used and how each technology helps the project.

## Frontend Stack

### React

React will be used to build the user interface. It is a strong fit because the app will have many interactive screens, such as the problem list, coding workspace, test case panel, submissions page, user profile, leaderboard, and AI mock interview section.

React will help by:

- Creating reusable UI components.
- Managing changing interface states like selected language, running status, test results, and interview messages.
- Managing AI interview states such as selected domain, uploaded CV, camera permission, microphone permission, active question, transcript, silence timer, and interview feedback.
- Keeping the app responsive and smooth as users move between practice and interview workflows.

### Vite

Vite will be used as the frontend build tool and development server. It gives fast startup, quick hot reloads, and a simple setup for modern React projects.

Vite will help by:

- Making frontend development faster.
- Keeping the project lightweight.
- Building optimized production files when the project is ready to deploy.

### React Router

React Router will be used for client-side navigation between pages.

Expected routes can include:

- Home page.
- Problems page.
- Problem workspace page.
- Submissions page.
- User profile page.
- Leaderboard page.
- Admin problem management page.
- AI mock interview setup page for domain selection and CV upload.
- Camera and microphone setup page.
- Live AI interview room.
- AI interview feedback page.

React Router will help the app feel like a complete platform instead of a collection of disconnected pages.

### Monaco Editor

Monaco Editor will be used for the in-browser code editor. It is the same editor technology used by Visual Studio Code, so it gives a professional coding experience.

Monaco Editor will help by:

- Providing syntax highlighting.
- Supporting multiple programming languages.
- Giving users a familiar coding environment.
- Making the problem workspace feel closer to real coding platforms.

### CSS

The project can continue with plain CSS or scoped CSS files, matching the current reference style. This is enough for a custom-designed coding platform and keeps the styling simple to understand.

CSS will help by:

- Building a polished coding workspace.
- Creating clean layouts for problem statements, editors, test panels, dashboards, and interview screens.
- Creating the video-call-style interview interface inspired by the saved screenshot, with a large AI question/transcript panel, central animated AI orb, user camera tile, and bottom interview controls.
- Keeping the UI consistent across the frontend.

### Browser Media APIs

The AI interview section will use browser media APIs, especially `navigator.mediaDevices.getUserMedia`, to request camera and microphone access before the interview starts.

Browser media APIs will help by:

- Opening the user's camera preview.
- Checking microphone access before the interview.
- Blocking interview start until required permissions are ready.
- Creating a realistic interview setup step before the live room.

## Backend Stack

### Node.js

Node.js will be used for the backend runtime. It works well with JavaScript-based full-stack projects and is a good fit for APIs, queues, and real-time features.

Node.js will help by:

- Running the backend API server.
- Sharing a similar language ecosystem with the frontend.
- Supporting async operations such as database queries, queue jobs, AI API calls, speech processing, and interview session updates.

### Express

Express will be used to build the REST API. The reference project already uses Express routes for problems, code running, submissions, and authentication status.

Express will help by:

- Creating clear API endpoints.
- Handling requests from the frontend.
- Organizing features into routes such as auth, problems, run, submissions, resumes, interview setup, interview sessions, and interview feedback.
- Keeping the backend simple and easy to extend.

### JWT Authentication

JWT-based authentication will be used to protect user-specific features.

It will help by:

- Allowing users to register and log in.
- Protecting routes like submissions, profile, resume upload, and interview history.
- Protecting interview setup, camera/microphone readiness state, interview sessions, and feedback reports.
- Letting the frontend send an auth token with API requests.

### PostgreSQL

PostgreSQL will be the main database. It is reliable, structured, and a strong choice for this type of platform.

PostgreSQL will store:

- Users.
- Problems.
- Test cases.
- Submissions.
- Supported languages.
- Resume or CV metadata.
- AI mock interview sessions.
- Selected interview domains.
- Interview questions, answers, and feedback.
- Interview transcripts and silence events.
- Leaderboard and progress data.

PostgreSQL will help by keeping the application's important data organized and queryable.

### pg

The `pg` package will be used for connecting the Node.js backend to PostgreSQL. The reference project already uses this approach, so continuing with it keeps the backend consistent.

`pg` will help by:

- Running SQL queries from the backend.
- Reading and writing user, problem, submission, and interview data.
- Keeping database access direct and easy to understand.

## Code Execution and Judging Stack

### Redis

Redis will be used as the queue backend for code submissions. It is fast and works well with background job systems.

Redis will help by:

- Holding submission jobs before they are judged.
- Preventing the API server from blocking while code is being executed.
- Supporting a smoother submission flow when many users submit code.

### BullMQ

BullMQ will be used to manage submission queues. The backend can add a submission job to the queue, and the worker can process it separately.

BullMQ will help by:

- Managing queued judging jobs.
- Tracking job progress and failures.
- Separating the request-response API flow from long-running code execution.

### Worker Service

A separate worker service will process submitted code. This matches the reference architecture in `D:\TCode`, where the backend queues submissions and the worker judges them.

The worker will help by:

- Running submitted code against test cases.
- Updating submission status in the database.
- Calculating verdicts such as accepted or wrong answer.
- Keeping code execution separate from the main API server.

### Docker-Based Code Isolation

Docker-based isolation is now the default approach for running user code locally. Running user-submitted code directly on the machine is risky, so the runner executes allowlisted language wrappers inside restricted containers.

Docker isolation will help by:

- Limiting CPU, memory, and execution time.
- Preventing unsafe file or system access.
- Making the judging system safer and closer to real online judges.
- Disabling container networking for submitted code.
- Cleaning up each per-run container and temporary directory after execution.

### Submission Verdicts

The judging system should support clear verdicts, including:

- Pending.
- Running.
- Accepted.
- Wrong Answer.
- Compilation Error.
- Runtime Error.
- Time Limit Exceeded.
- Memory Limit Exceeded.
- Queue Error.

These verdicts will help users understand exactly what happened after submitting code.

## Mandatory AI Mock Interview Stack

### LLM API

An LLM API will be used to generate interview questions, follow-up questions, and feedback. This feature is mandatory for the project and should behave like a real interviewer rather than a fixed question list.

The LLM API will help by:

- Creating domain-specific interview questions.
- Personalizing questions based on the user's CV.
- Asking adaptive follow-up questions based on the user's answers.
- Detecting mentioned projects, technologies, tools, and experiences during the conversation.
- Choosing the next question dynamically instead of only using stored or prewritten questions.
- Generating feedback after the interview.

Supported interview domains can include:

- Frontend development.
- Backend development.
- Full-stack development.
- Data structures and algorithms.
- Machine learning.
- Data analysis.
- DevOps.
- Cybersecurity.
- General HR.

### Resume and CV Parsing

The platform should support CV uploads so the AI interviewer can use the user's background as context. The parser should extract useful text from PDF or DOCX files.

CV parsing will help by:

- Reading skills, projects, education, and experience.
- Creating personalized interview questions.
- Asking project-based and experience-based follow-ups.
- Making the mock interview feel closer to a real interview.

### Interview Setup Flow

The AI interview flow will start before the live room.

The setup flow will include:

- Domain selection.
- CV or resume upload.
- Next button to continue.
- Camera permission request.
- Microphone permission request.
- Camera preview and microphone readiness check.
- Start Your Interview button after permissions are ready.

This setup flow will help the interview feel intentional and realistic, while also making permission failures easier to handle before the live session begins.

### Video-Call Interview Interface

The live interview room should look and feel like a video call. The saved screenshot in the project folder is the visual reference for this direction.

The interface should include:

- A large AI question or transcript panel.
- A central animated AI ball or orb that moves while the AI speaks.
- A live user camera preview tile.
- Interview identity/status in the bottom area.
- A Leave Interview button.

This layout will make the interview feel different from a normal chatbot and closer to a real interview call.

### Speech-to-Text

Speech-to-text will convert the user's spoken answers into text that the AI can analyze.

Speech-to-text will help by:

- Letting the user answer naturally by speaking.
- Creating a transcript for the AI to understand.
- Saving answers for feedback and interview history.
- Supporting adaptive follow-up questions based on what the user actually said.

A typed answer fallback should also exist for accessibility and for cases where microphone access fails.

### Text-to-Speech

Text-to-speech will make the AI interviewer speak questions and follow-ups aloud.

Text-to-speech will help by:

- Making the interview feel like a real-time spoken experience.
- Driving the animated AI orb while the AI is speaking.
- Reducing the feeling of a static chat interface.

### Silence Detection

The interview should detect when the user is quiet or inactive for too long. If the user is silent for more than 4 to 5 minutes, the AI can prompt the user, repeat or clarify the question, or move the interview forward gracefully.

Silence detection will help by:

- Preventing the interview from getting stuck.
- Making the AI behave more like a real interviewer.
- Giving the user a chance to recover if they are unsure how to answer.

### Interview Storage in PostgreSQL

Mock interview data should be stored in PostgreSQL.

The database can store:

- Uploaded resume metadata.
- Selected interview domain.
- Interview questions.
- User answers.
- Interview transcripts.
- Silence or inactivity events.
- AI feedback.
- Scores or improvement suggestions.
- Interview history.

This will help users review past interviews and track improvement over time.

### Streaming or WebSocket Support

Streaming responses or WebSocket support should be used for the live interview room when possible, because the AI interview needs to feel real-time.

This will help by:

- Showing AI responses as they are generated.
- Supporting a more natural chat-style interview.
- Updating the frontend when the AI is thinking, speaking, listening, or waiting.
- Coordinating transcript updates, silence timers, and interview state.

### AI Orb Animation

The AI interviewer will be represented by a live animated ball or orb figure instead of a static profile image.

The animation can react to:

- AI speaking state.
- AI thinking state.
- Waiting for the user.
- Interview transitions.

This gives the interview room a clear visual identity and matches the screenshot direction.

## DevOps and Environment Stack

### Docker Compose

Docker Compose will be used to run supporting services such as PostgreSQL and Redis. The reference project already has a `docker-compose.yml` for these services.

Docker Compose will help by:

- Starting the database and queue services with one command.
- Making local development easier.
- Keeping service configuration consistent across machines.

### Environment Variables

Environment variables will be managed through `.env` and `.env.example` files.

They will store values such as:

- Backend port.
- Database URL.
- Redis host and port.
- JWT secret.
- AI API key.
- Speech-to-text provider key, if needed.
- Text-to-speech provider key, if needed.
- Frontend API base URL.

Environment variables will help keep secrets and environment-specific settings out of the source code.

The backend now fails startup if `JWT_SECRET` is missing. `.env.example` documents safe placeholder values, while real secrets stay in the ignored root `.env` or the production host secret manager.

### API Security Middleware

The backend uses Helmet, strict CORS, route-level rate limits, and Zod validation. These controls protect auth, code execution, submissions, resume uploads, and interview endpoints from common abuse patterns and malformed input.

### Frontend Deployment Headers

The frontend includes Vercel response headers with a report-only Content Security Policy. Monaco requires a careful CSP rollout, so report-only mode is the first production-safe step before enforcement.

### Separate Services

The project should keep clear service boundaries:

- `frontend` for the React web app.
- `backend` for APIs, authentication, database access, and queue creation.
- `worker` for background code judging.

This structure will help the project stay organized as it grows.

## How the Stack Works Together

1. The user opens the React frontend.
2. React Router loads the correct page, such as problems, workspace, or AI interview.
3. The frontend calls the Express backend through REST APIs.
4. The backend reads and writes data using PostgreSQL.
5. When a user submits code, the backend stores a pending submission.
6. The backend adds a judging job to BullMQ.
7. Redis holds the queued job.
8. The worker picks up the job, runs the code, checks test cases, and updates the submission verdict.
9. The frontend displays the result to the user.
10. For AI mock interviews, the user selects a domain and uploads a CV.
11. The backend parses the CV and creates an interview session.
12. The frontend requests camera and microphone access before the interview starts.
13. The live room opens with an animated AI orb, a user camera preview, transcript/question display, and interview controls.
14. The AI asks a question using the selected domain and CV context.
15. The user's spoken answer is converted to text.
16. The backend sends the CV context, interview history, and latest answer to the LLM API.
17. The AI chooses the next question dynamically based on the user's answer.
18. If the user is quiet for 4 to 5 minutes, the AI prompts the user or moves forward.
19. At the end, the system stores and displays interview feedback.

## Why This Stack Fits the Project

This stack is practical for a portfolio-level coding platform because it shows real full-stack engineering skills:

- React and Monaco demonstrate a strong frontend coding workspace.
- Express and PostgreSQL show backend and database design.
- Redis, BullMQ, and workers show asynchronous system design.
- Docker Compose shows service-based development.
- The AI interview room shows modern AI product integration, browser media handling, speech workflows, and adaptive real-time UX.

Together, these technologies support both major goals of the project: coding practice and realistic interview preparation.
