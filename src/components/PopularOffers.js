import React from 'react';

const PopularOffers = ({ offers }) => {
  return (
    <div className="popular-offers bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Najpopularniejsze</h2>
      <ul className="space-y-3 text-white">
        {offers.map((offer) => (
          <li
            key={offer.id}
            className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 hover:shadow-lg transition flex justify-between items-center"
          >
            <span className="font-medium">{offer.title}</span>
            <span className="text-yellow-400 font-bold">{offer.price} zł</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularOffers;