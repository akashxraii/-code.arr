import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Problems from './pages/Problems.jsx';
import Workspace from './pages/Workspace.jsx';
import Submissions from './pages/Submissions.jsx';
import InterviewSetup from './pages/InterviewSetup.jsx';
import InterviewPermissions from './pages/InterviewPermissions.jsx';
import InterviewRoom from './pages/InterviewRoom.jsx';
import InterviewFeedback from './pages/InterviewFeedback.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css';

const routesWithoutNavbar = ['/interview/room', '/problems/'];

function App() {
  const location = useLocation();
  const shouldShowNavbar = !routesWithoutNavbar.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <div className="app-shell">
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:slug" element={<Workspace />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/interview" element={<InterviewSetup />} />
        <Route path="/interview/permissions" element={<InterviewPermissions />} />
        <Route path="/interview/room/:id" element={<InterviewRoom />} />
        <Route path="/interview/:id/feedback" element={<InterviewFeedback />} />
      </Routes>
    </div>
  );
}

export default App;
