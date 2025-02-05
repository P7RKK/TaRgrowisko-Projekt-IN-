import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/userSlice'; // Import akcji login
import './LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch(); // Dostęp do akcji Redux
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    console.log('Rozpoczęcie logowania:');
    console.log('Podany email:', email);
    console.log('Podane hasło:', password);

    if (email === 'test@example.com' && password === 'password123') {
      console.log('Dane logowania poprawne, wysyłanie do Redux...');
      dispatch(
        login({
          id: 1,
          name: 'Testowy Użytkownik',
          email,
        })
      );
      setError('');
      console.log('Zalogowano pomyślnie.');
    } else {
      console.log('Niepoprawne dane logowania.');
      setError('Niepoprawny email lub hasło.');
    }
  };

  const handleTestLogin = () => {
    console.log('Logowanie jako użytkownik testowy...');
    dispatch(
      login({
        id: 1,
        name: 'Testowy Użytkownik',
        email: 'test@example.com',
      })
    );
    setError('');
    console.log('Zalogowano jako użytkownik testowy.');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Logowanie</h1>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Wprowadź swój email"
              required
            />
          </div>
          <div className="form-group">
            <label>Hasło</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wprowadź swoje hasło"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="button" className="login-button" onClick={handleLogin}>
            Zaloguj się
          </button>
          <button type="button" className="test-login-button" onClick={handleTestLogin}>
            Zaloguj jako Testowy Użytkownik
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
