import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameDetails } from '../services/api'; // Funkcja mockująca dane

const SzczegolyGry = () => {
  const { id } = useParams();
  const [gra, setGra] = useState(null);

  useEffect(() => {
    const pobierzSzczegolyGry = async () => {
      try {
        const { data } = await fetchGameDetails(id);
        setGra(data);
      } catch (error) {
        console.error('Błąd podczas pobierania szczegółów gry:', error);
      }
    };

    pobierzSzczegolyGry();
  }, [id]);

  if (!gra) return <p className="text-center text-gray-500">Ładowanie szczegółów gry...</p>;

  return (
    <div className="container mt-10 p-4 card">
      <img src={gra.image} alt={gra.name} className="mb-4 w-full rounded" />
      <h1 className="text-3xl font-bold mb-4">{gra.name}</h1>
      <p className="card-description">{gra.description}</p>
      <p className="text-lg font-semibold mb-6">Cena: {gra.price} zł</p>
      <button className="button-primary">Dodaj do koszyka</button>
    </div>
  );
};

export default SzczegolyGry;