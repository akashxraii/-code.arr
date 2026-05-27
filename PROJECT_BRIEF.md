# code.arr - Project Brief

## Project Idea

code.arr is a web app for practicing coding problems. Users can solve programming challenges, run their code against test cases, submit solutions, track progress, and improve their problem-solving skills.

The goal is to build a clean, useful platform that shows strong full-stack development skills: authentication, problem management, code execution, submissions, leaderboards, dashboards, an admin panel, and a mandatory AI mock interview experience.

## Purpose

The app will help users:

- Practice coding questions by topic and difficulty.
- Write and run code in the browser.
- Submit solutions and get verdicts such as Accepted, Wrong Answer, Runtime Error, or Time Limit Exceeded.
- Track solved problems, attempts, streaks, and progress.
- Compete through rankings, contests, or timed challenges.
- Get a real-time AI mock interview experience based on their selected domain and uploaded CV.

For the developer portfolio, this project demonstrates:

- Full-stack web development.
- Database design.
- Secure authentication and authorization.
- Code editor integration.
- Backend API design.
- Problem judging and submission workflows.
- AI-powered interview workflows.
- File upload and CV parsing.
- UI design for a real productivity tool.

## Target Users

- Students preparing for coding interviews.
- Beginners learning data structures and algorithms.
- Competitive programmers who want practice problems.
- Teachers or mentors who want to assign coding tasks.
- Recruiters or admins who want to create tests or contests.
- Job seekers who want realistic interview practice based on their own resume.

## Core Features

### User Features

- Sign up, log in, and log out.
- View a list of coding problems.
- Filter problems by difficulty, topic, status, and tags.
- Open a problem details page with statement, examples, constraints, and starter code.
- Write code in an in-browser editor.
- Select a programming language.
- Run code against sample test cases.
- Submit code for final judging.
- View submission results and past submissions.
- Track solved problems and progress.

### Problem Features

- Problem title, description, difficulty, tags, constraints, and examples.
- Hidden test cases for judging final submissions.
- Sample test cases for user testing.
- Editorial or solution explanation after solving.
- Acceptance rate and submission count.

### Admin Features

- Create, update, and delete problems.
- Add sample and hidden test cases.
- Manage supported languages.
- View submissions from users.
- Manage users if needed.

### Competitive Features

- Leaderboard based on solved problems or points.
- User profile with stats.
- Daily challenge or featured problem.
- Contests with start time, end time, ranking, and problem sets.

### AI Mock Interview Features

- The AI mock interview section is mandatory for this project.
- User first selects an interview domain and uploads their CV or resume.
- Supported domains can include frontend development, backend development, full-stack development, data structures and algorithms, machine learning, data analysis, DevOps, cybersecurity, or general HR.
- After domain selection and CV upload, the user clicks a Next button to continue.
- The next step checks required interview permissions, including camera and microphone access.
- Once camera and microphone are ready, the user can press a Start Your Interview button.
- The interview interface should feel like a video call.
- The screen should include an AI interviewer area and a user camera preview area.
- The AI interviewer should be represented by a live animated ball or orb-style figure that moves while the AI is speaking.
- The AI asks questions through voice and/or displayed text.
- The AI should wait for the user to answer before replying.
- If the user stays silent or inactive for more than 4 to 5 minutes, the AI can prompt the user, repeat the question, or move the interview forward.
- The AI should not only ask fixed, prewritten, or stored questions.
- The AI should learn from the user's CV, selected domain, and live answers during the interview.
- The AI should adapt follow-up questions like a real interviewer. For example, if the user mentions React, a project, or another technology while answering, the AI can ask deeper questions about that topic.
- Interview can include technical questions, project-based questions, behavioral questions, resume-based questions, and follow-up questions.
- User receives feedback after the interview, including strengths, weak areas, answer quality, confidence, communication, technical depth, and suggested improvements.
- User can view interview history and compare performance over time.
- User can retake interviews for the same domain or choose a different domain.

### AI Mock Interview Flow

1. User opens the AI mock interview section.
2. User selects an interview domain.
3. User uploads a CV or resume.
4. User clicks Next.
5. App opens a setup page for camera and microphone permissions.
6. User allows camera and microphone access.
7. App shows a preview/check screen confirming that the camera and microphone are working.
8. User clicks Start Your Interview.
9. App opens a video-call-style interview interface.
10. AI interviewer appears as an animated speaking orb or ball.
11. User appears in a live camera preview tile.
12. AI asks the first question using the selected domain and CV context.
13. User answers by voice, with typed fallback as an accessibility option.
14. AI listens, understands the answer, and chooses the next question dynamically.
15. AI asks follow-up questions based on the user's answer, projects, skills, and mentioned technologies.
16. If the user is quiet for 4 to 5 minutes, AI prompts the user or moves forward gracefully.
17. At the end, the app generates a detailed interview feedback report.

### AI Interview Interface Direction

- The interface should be inspired by the saved mock interview screenshot in this project folder.
- The AI question or transcript can appear in a large readable panel near the top.
- The AI avatar should be a central animated orb or ball that visually reacts while speaking.
- The user's camera feed should appear in a smaller video tile.
- The bottom area can show interview identity, selected domain, status, and a Leave Interview button.
- The design should feel calm, focused, and like a real interview call rather than a normal chatbot.

## Main Pages

- Landing or home page with featured problems and user stats.
- Authentication pages for login and signup.
- Problems page with filters and search.
- Problem detail page with code editor and submission panel.
- Submissions page showing verdicts and history.
- User profile page with solved problems and progress.
- Leaderboard page.
- Admin dashboard for problem management.
- Contest page, if contests are included.
- AI mock interview setup page with domain selection and CV upload.
- AI interview permission page for camera and microphone setup.
- Live AI interview room with video-call-style layout, animated AI orb, user camera tile, transcript/question display, and leave button.
- AI interview feedback report page.

## Suggested MVP

The first working version should focus on the smallest complete flow:

1. User can register and log in.
2. User can view coding problems.
3. User can open a problem and read its statement.
4. User can write code in a browser editor.
5. User can run code against sample tests.
6. User can submit code.
7. Backend saves the submission and returns a verdict.
8. User can see submission history.
9. Admin can create and edit problems.

After the coding practice MVP works, the next important milestone should be the mandatory AI mock interview MVP:

1. User can select an interview domain.
2. User can upload a CV.
3. System extracts useful information such as skills, projects, education, and experience.
4. User can proceed to a camera and microphone setup page.
5. User can allow camera and microphone permissions.
6. User can start the interview.
7. User sees a video-call-style interview interface with an AI speaking orb and user camera preview.
8. AI generates a personalized first question using the selected domain and CV.
9. User answers by voice, with typed fallback as an accessibility option.
10. AI asks adaptive follow-up questions based on the user's live answers.
11. AI handles long silence after 4 to 5 minutes by prompting the user or moving forward.
12. User receives a final feedback report.

## Future Enhancements

- Contest system.
- AI hints or explanation assistant.
- Discussion section for each problem.
- Company-wise problem lists.
- Topic-wise learning paths.
- Badges and achievements.
- Streak tracking.
- Public profiles.
- Plagiarism detection.
- Resume-friendly coding profile.
- Classroom mode for teachers.
- Interview difficulty levels.
- Company-specific mock interviews.
- Domain-specific interview roadmaps.
- AI-generated improvement plan after each interview.

## Possible Tech Stack

### Frontend

- React or Next.js.
- TypeScript.
- Tailwind CSS.
- Monaco Editor or CodeMirror for the code editor.

### Backend

- Node.js with Express or NestJS.
- REST API or GraphQL.
- JWT or session-based authentication.

### Database

- PostgreSQL or MongoDB.
- Prisma or Mongoose for database access.

### Code Execution

- Docker-based sandbox for secure code execution.
- External judge API for early development, if building a judge is too complex at first.
- Queue system for submissions, such as BullMQ with Redis.

### AI Interview System

- LLM API for generating questions, follow-ups, and feedback.
- Resume parser for extracting text from PDF or DOCX files.
- Vector search or structured profile storage for using CV content as interview context.
- Browser camera and microphone APIs for the interview setup and live room.
- Speech-to-text for converting the user's spoken answer into text.
- Text-to-speech for making the AI interviewer speak.
- WebSocket or streaming API for real-time AI response and interview state updates.
- Animation support for the AI orb so it reacts while the AI speaks.

## Suggested Database Entities

- User
- Problem
- TestCase
- Submission
- Language
- Contest
- ContestProblem
- LeaderboardEntry
- Topic
- ProblemTag
- Resume
- MockInterview
- InterviewDomain
- InterviewQuestion
- InterviewAnswer
- InterviewFeedback
- InterviewMediaPermission

## Submission Verdicts

- Accepted
- Wrong Answer
- Compilation Error
- Runtime Error
- Time Limit Exceeded
- Memory Limit Exceeded
- Pending
- Judging

## Current Security Baseline

Running user code is dangerous, so code execution is isolated through Docker by default. The local runner uses allowlisted language images, no container network, memory/CPU/PID limits, a read-only root filesystem, per-run temporary directories, and timeout cleanup. `CODE_RUNNER_MODE=process` exists only as an explicit development fallback and should not be used with untrusted users.

The public API process is hardened with required JWT configuration, strict CORS, Helmet security headers, route-level rate limits, and Zod request validation. `/api/run` and `/api/submissions` require authentication.

CV uploads are restricted to PDF, DOCX, and TXT files, capped at 2 MB, checked by extension, MIME type, and basic magic bytes, and extracted text is capped before being stored or sent to the AI interview prompt. Uploaded resume access is limited to the owning user.

Camera and microphone access should only be requested on the interview setup page, and the app should clearly show whether permissions are enabled before the user starts the interview. The app should not record or store video/audio unless that behavior is clearly explained and intentionally implemented.

For production deployment, Vercel should host only the React frontend. Render or another backend host should run the API, PostgreSQL, Redis, and a separate worker/runner service. Never run arbitrary user code inside the Vercel frontend or the main public API process without sandbox isolation.

## Success Criteria

The project is successful when a user can:

- Create an account.
- Solve a problem using the web editor.
- Run and submit code.
- Receive a clear result.
- Track their progress over time.
- Upload a CV and complete a personalized AI mock interview.
- Use camera and microphone setup before starting the interview.
- Experience a video-call-style AI interview with an animated AI interviewer and live user preview.
- Receive adaptive follow-up questions based on their CV and live answers.
- Receive useful interview feedback and improvement suggestions.

The project should feel like a real coding practice platform, not just a demo page.
