import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put('http://localhost:5000/api/users/update-password', {
        currentPassword,
        newPassword,
      });
      setMessage('Hasło zostało zaktualizowane pomyślnie');
    } catch (error) {
      setMessage('Błąd zmiany hasła');
    }
  };

  return (
    <div>
      <h1>Zmień Hasło</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Obecne Hasło:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Nowe Hasło:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Zmień Hasło</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePasswordPage;
