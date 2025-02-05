import React from 'react';
import UserProfile from '../components/UserProfile';

const ProfilePage = () => {
  const user = {
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Pasjonat gier planszowych i komputerowych.',
    joinDate: '2022-05-15',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#fff', textAlign: 'center' }}>Profil użytkownika</h1>
      <UserProfile user={user} />
    </div>
  );
};

export default ProfilePage;
