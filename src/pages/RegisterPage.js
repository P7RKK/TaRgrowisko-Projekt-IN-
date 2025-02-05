import React from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Rejestracja</h1>
        <p>Utwórz swoje konto, aby dołączyć do naszej społeczności.</p>
        <form className="register-form">
          <div className="form-group">
            <label>Login</label>
            <input type="text" placeholder="Wprowadź swój login" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Wprowadź swój email" required />
          </div>
          <div className="form-group">
            <label>Hasło</label>
            <input type="password" placeholder="Wprowadź hasło" required />
          </div>
          <div className="form-group">
            <label>Potwierdź hasło</label>
            <input type="password" placeholder="Powtórz hasło" required />
          </div>
          <button type="submit" className="register-button">ZAREJESTRUJ SIĘ</button>
        </form>
        <div className="register-footer">
          Masz już konto? <a href="/login">Zaloguj się</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
