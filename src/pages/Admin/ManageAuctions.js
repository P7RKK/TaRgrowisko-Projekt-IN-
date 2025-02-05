import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageAuctions = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/auctions', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAuctions(data);
      } catch (err) {
        console.error('Błąd podczas pobierania aukcji:', err);
      }
    };

    fetchAuctions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/auctions/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAuctions(auctions.filter((auction) => auction._id !== id));
    } catch (err) {
      console.error('Błąd podczas usuwania aukcji:', err);
    }
  };

  return (
    <div>
      <h2>Zarządzanie aukcjami</h2>
      <ul>
        {auctions.map((auction) => (
          <li key={auction._id}>
            <p>
              <strong>{auction.title}</strong> - Cena początkowa: {auction.price} zł
            </p>
            <button onClick={() => handleDelete(auction._id)}>Usuń aukcję</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAuctions;
