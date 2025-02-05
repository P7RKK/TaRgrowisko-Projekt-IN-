import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SzczegolyZakupu = () => {
  const { id } = useParams();
  const [zakup, setZakup] = useState(null);

  useEffect(() => {
    // Symulowane pobranie danych zakupu
    const daneZakupu = {
      id: id,
      name: 'Cyberpunk 2077',
      price: 100,
      date: '2024-01-01',
      details: 'Gra została zakupiona w promocji noworocznej.',
    };
    setZakup(daneZakupu);
  }, [id]);

  if (!zakup) return <p>Ładowanie szczegółów zakupu...</p>;

  return (
    <div className="container mt-10">
      <h1 className="text-3xl font-bold mb-4">Szczegóły zakupu</h1>
      <div className="card p-4">
        <h2 className="card-title">{zakup.name}</h2>
        <p className="card-description">Cena: {zakup.price} zł</p>
        <p className="text-sm text-gray-600">Data zakupu: {zakup.date}</p>
        <p className="mt-4">{zakup.details}</p>
      </div>
    </div>
  );
};

export default SzczegolyZakupu;