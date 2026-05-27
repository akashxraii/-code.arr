import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setToken } from '../api';

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function switchMode() {
    setMode((current) => (current === 'login' ? 'register' : 'login'));
    setError('');
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const path = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = await api(path, {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setToken(payload.token);
      navigate('/problems');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page auth-page">
      <form className="auth-panel" onSubmit={submit}>
        <header className="auth-header">
          <h1>{mode === 'login' ? 'Log in' : 'Sign up'}</h1>
          <p>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button className="auth-inline-button" type="button" onClick={switchMode}>
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </header>

        <div className="social-auth-list" aria-label="Social sign-in options">
          <button className="social-auth-button" type="button" disabled>
            <span className="social-auth-icon google-icon" aria-hidden="true">G</span>
            Continue with Google
          </button>
          <button className="social-auth-button" type="button" disabled>
            <span className="social-auth-icon facebook-icon" aria-hidden="true">f</span>
            Continue with Facebook
          </button>
          <button className="social-auth-button" type="button" disabled>
            <span className="social-auth-icon apple-icon" aria-hidden="true">a</span>
            Continue with Apple
          </button>
        </div>

        <div className="auth-divider">
          <span>Or continue with email</span>
        </div>

        {mode === 'register' && (
          <label>
            Username
            <input 
              name="username" 
              value={form.username} 
              onChange={updateField}
              required
              minLength={3}
              maxLength={50}
              pattern="^[A-Za-z0-9_.-]+$"
              title="Username must be 3-50 characters with letters, numbers, dots, hyphens, or underscores"
            />
          </label>
        )}

        <label>
          Email address
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={updateField}
            required
            maxLength={120}
          />
        </label>

        <label className="password-label">
          <span>Password</span>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={updateField}
              required
              minLength={mode === 'login' ? 1 : 8}
              maxLength={200}
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        <div className="auth-options">
          <label className="remember-option">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            Remember me
          </label>
          <button className="forgot-link" type="button">
            Forgot your password
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="primary-button auth-submit" type="submit" disabled={isLoading}>
          {isLoading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Sign up'}
        </button>
      </form>
    </main>
  );
}

export default Login;
