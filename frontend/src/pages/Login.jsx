import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setToken } from '../api';

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
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
      <form className="panel auth-panel" onSubmit={submit}>
        <p className="eyebrow">{mode === 'login' ? 'Welcome back' : 'Create account'}</p>
        <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>

        {mode === 'register' && (
          <label>
            Username
            <input name="username" value={form.username} onChange={updateField} />
          </label>
        )}

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={updateField} />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={updateField}
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button className="primary-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
        </button>
        <button
          className="text-button"
          type="button"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Need an account?' : 'Already have an account?'}
        </button>
      </form>
    </main>
  );
}

export default Login;
