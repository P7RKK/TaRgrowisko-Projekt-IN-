import React from 'react';
import { useLocation } from 'react-router-dom';

const PotwierdzenieZamowienia = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return <p>Nie znaleziono danych zamówienia.</p>;
  }

  return (
    <div className="container mt-10">
      <h1 className="text-3xl font-bold mb-4">Potwierdzenie zamówienia</h1>
      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-2">Szczegóły zamówienia</h2>
        {order.items.map((item) => (
          <div key={item.id} className="mb-2">
            <p>{item.name}</p>
            <p>Cena: {item.price} zł</p>
            <p>Ilość: {item.quantity}</p>
          </div>
        ))}
        <h3 className="text-lg font-bold mt-4">Suma: {order.total} zł</h3>
      </div>
      <button className="button-primary mt-4">Powrót do sklepu</button>
    </div>
  );
};

export default PotwierdzenieZamowienia;
