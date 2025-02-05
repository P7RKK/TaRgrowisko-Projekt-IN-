import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Rekomendacje = () => {
  const [zakupy] = useState([
    { id: 1, name: 'Cyberpunk 2077', category: 'RPG' },
    { id: 2, name: 'The Witcher 3', category: 'RPG' },
  ]);

  const [rekomendacje, setRekomendacje] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    const pobierzRekomendacje = async () => {
      // Symulacja API
      const dane = [
        {
          id: 3,
          name: 'Dragon Age: Origins',
          category: 'RPG',
          price: 120,
          description: 'Klasyczna gra RPG osadzona w fantastycznym świecie.',
          image: '/images/dragon-age.jpg',
        },
        {
          id: 4,
          name: 'Divinity: Original Sin 2',
          category: 'RPG',
          price: 150,
          description: 'Strategiczna gra RPG z epicką fabułą.',
          image: '/images/divinity.jpg',
        },
      ];
      setRekomendacje(dane.filter((rek) => zakupy.some((z) => z.category === rek.category)));
    };

    pobierzRekomendacje();
  }, [zakupy]);

  const dodajDoKoszyka = (gra) => {
    dispatch({ type: 'ADD_TO_CART', payload: gra });
    alert(`${gra.name} został dodany do koszyka.`);
  };

  return (
    <div className="container mt-10">
      <h1 className="text-3xl font-bold mb-4">Rekomendacje dla Ciebie</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rekomendacje.map((rek) => (
          <div key={rek.id} className="card">
            <img src={rek.image} alt={rek.name} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="card-title">{rek.name}</h2>
            <p className="card-description">{rek.description}</p>
            <p className="text-lg font-semibold">Cena: {rek.price} zł</p>
            <button
              onClick={() => dodajDoKoszyka(rek)}
              className="button-primary mt-4"
            >
              Dodaj do koszyka
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rekomendacje;