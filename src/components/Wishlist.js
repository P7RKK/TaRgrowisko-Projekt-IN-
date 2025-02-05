import React from 'react';

const Wishlist = ({ wishlist }) => {
  return (
    <div className="wishlist bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Twoja Lista Życzeń</h2>
      <ul className="space-y-3 text-white">
        {wishlist.map((item) => (
          <li
            key={item.id}
            className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 hover:shadow-lg transition"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;