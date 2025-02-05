import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const toggleBlock = async (id) => {
    await axios.put(`http://localhost:5000/api/admin/users/${id}/block`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setUsers(users.map(user => user._id === id ? { ...user, isBlocked: !user.isBlocked } : user));
  };

  return (
    <div>
      <h2>Zarządzanie użytkownikami</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email}) - {user.isBlocked ? 'Zablokowany' : 'Aktywny'}
            <button onClick={() => toggleBlock(user._id)}>
              {user.isBlocked ? 'Odblokuj' : 'Zablokuj'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
