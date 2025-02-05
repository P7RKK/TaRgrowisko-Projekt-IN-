import React, { useState } from 'react';
import { createAuction } from '../api/auctionAPI';

const AuctionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
    endTime: '',
    images: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      for (let key in formData) {
        if (key === 'images') {
          for (let image of formData.images) {
            data.append('images', image);
          }
        } else {
          data.append(key, formData[key]);
        }
      }
      await createAuction(data, token);
      alert('Aukcja została utworzona!');
    } catch (error) {
      console.error('Błąd tworzenia aukcji:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        type="text"
        placeholder="Tytuł"
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Cena wywoławcza"
        onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
        required
      />
      <button type="submit">Stwórz aukcję</button>
    </form>
  );
};

export default AuctionForm;
