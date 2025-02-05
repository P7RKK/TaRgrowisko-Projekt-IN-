import React, { useState } from 'react';
import axios from 'axios';

const EditProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put('http://localhost:5000/api/users/profile', { name, email });
      setMessage('Dane zostały zaktualizowane');
    } catch (error) {
      setMessage('Błąd aktualizacji danych');
    }
  };

  return (
    <div>
      <h1>Edytuj Profil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Imię:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Zapisz zmiany</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditProfilePage;
