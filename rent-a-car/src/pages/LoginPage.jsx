import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store';
import { useNavigate } from 'react-router-dom';
import Input  from '../components/Input';
import Button from '../components/Button';

export default function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '' });
  const { status, error }   = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(values)).unwrap();
      nav('/users');
    } catch {
    }
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
          />

          <Input
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            type="password"
          />

          {error && <p className="error-text">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            className="btn-full"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
