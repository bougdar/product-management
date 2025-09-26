import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../App.css';

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);

      localStorage.setItem('token', data.token);
      setToken(data.token);

      navigate('/products');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem', fontSize: '1rem', cursor: 'pointer' }}>Login</button>
        </form>
        {message && <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>}
      </header>
    </div>
  );
};

export default LoginPage;
