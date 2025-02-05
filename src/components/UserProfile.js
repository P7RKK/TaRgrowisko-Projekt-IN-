import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ user = {} }) => {
  const [profile, setProfile] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', avatar: '', bio: '' });
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [activityHistory, setActivityHistory] = useState([]);

  useEffect(() => {
    const initialProfile = {
      name: user.name || 'Nieznany użytkownik',
      email: user.email || 'brak@example.com',
      avatar: user.avatar || 'https://via.placeholder.com/150',
      bio: user.bio || 'Brak opisu użytkownika.',
      joinDate: user.joinDate || 'Nieznana data',
    };
    setProfile(initialProfile);
    setFormData(initialProfile);
    setActivityHistory([
      'Zmieniono hasło 2 dni temu',
      'Dodano nową aukcję: Laptop Dell',
      'Zaktualizowano zdjęcie profilowe',
    ]);
  }, [user]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setProfile(formData);
    setIsEditingProfile(false);
    alert('Profil został zaktualizowany!');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Hasła nie są zgodne!');
      return;
    }
    alert('Hasło zostało zmienione!');
    setPasswordData({ newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
  };

  if (!profile) return <div className="loading">Ładowanie profilu...</div>;

  return (
    <div className="profile-container">
      <div className="avatar-container">
        <img className="profile-avatar" src={profile.avatar} alt="Avatar" />
        <label className="change-avatar-button">
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          &#9998;
        </label>
      </div>
      {!isEditingProfile && !isChangingPassword ? (
        <div className="profile-content">
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-email">{profile.email}</p>
          <p className="profile-bio">{profile.bio}</p>
          <div className="profile-buttons">
            <button className="profile-button" onClick={() => setIsEditingProfile(true)}>Edytuj Profil</button>
            <button className="profile-button" onClick={() => setIsChangingPassword(true)}>Zmień Hasło</button>
          </div>
          <div className="profile-section">
            <h3 className="section-title">Historia aktywności</h3>
            <ul className="activity-list">
              {activityHistory.map((activity, index) => (
                <li key={index} className="activity-item">{activity}</li>
              ))}
            </ul>
          </div>
          <div className="profile-section">
            <h3 className="section-title">Ustawienia prywatności</h3>
            <div className="privacy-settings">
              <label>
                <input type="checkbox" /> Profil publiczny
              </label>
              <label>
                <input type="checkbox" /> Pokaż mój e-mail
              </label>
              <label>
                <input type="checkbox" /> Pokaż mój awatar
              </label>
            </div>
          </div>
        </div>
      ) : isEditingProfile ? (
        <div className="profile-edit">
          <input
            className="profile-input"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Imię i nazwisko"
          />
          <input
            className="profile-input"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="E-mail"
          />
          <textarea
            className="profile-textarea"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Opis"
          />
          <div className="profile-buttons">
            <button className="profile-button" onClick={handleSaveProfile}>Zapisz Profil</button>
            <button className="profile-button" onClick={() => setIsEditingProfile(false)}>Anuluj</button>
          </div>
        </div>
      ) : (
        <div className="profile-password">
          <input
            className="profile-input"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            placeholder="Nowe hasło"
          />
          <input
            className="profile-input"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            placeholder="Potwierdź hasło"
          />
          <div className="profile-buttons">
            <button className="profile-button" onClick={handleChangePassword}>Zapisz Hasło</button>
            <button className="profile-button" onClick={() => setIsChangingPassword(false)}>Anuluj</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;