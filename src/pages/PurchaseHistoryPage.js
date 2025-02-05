import React, { useState } from 'react';
import Ocena from '../components/Rating';

const HistoriaZakupow = () => {
  const [zakupy] = useState([
    { id: 1, name: 'Cyberpunk 2077', date: '2024-01-01', price: 100, rating: null },
    { id: 2, name: 'The Witcher 3', date: '2024-02-15', price: 80, rating: null },
  ]);

  const ocenGre = (id, rating) => {
    const zakup = zakupy.find((z) => z.id === id);
    zakup.rating = rating;
    alert(`Oceniłeś grę "${zakup.name}" na ${rating} gwiazdek.`);
  };

  return (
    <div className="container mt-10">
      <h1 className="text-3xl font-bold mb-4">Historia zakupów</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zakupy.map((zakup) => (
          <div key={zakup.id} className="card">
            <h2 className="card-title">{zakup.name}</h2>
            <p className="card-description">Data: {zakup.date}</p>
            <p>Cena: {zakup.price} zł</p>
            <Ocena onRate={(rating) => ocenGre(zakup.id, rating)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoriaZakupow;