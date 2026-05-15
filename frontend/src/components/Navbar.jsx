import { NavLink, useNavigate } from 'react-router-dom';
import { clearToken, getToken } from '../api';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(getToken());

  function logout() {
    clearToken();
    navigate('/login');
  }

  return (
    <nav className="top-nav">
      <NavLink className="brand" to="/">
        <span className="brand-mark">{'{}'}</span>code.arr
      </NavLink>
      <div className="nav-links nav-links-center">
        <NavLink to="/problems">Problems</NavLink>
        <NavLink to="/submissions">Submissions</NavLink>
        <NavLink to="/interview">AI Interview</NavLink>
      </div>
      <div className="nav-links nav-links-auth">
        {isLoggedIn ? (
          <button type="button" onClick={logout}>
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
