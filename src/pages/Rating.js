import React, { useState } from 'react';

const Ocena = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  };

  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`text-xl ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => handleRating(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default Ocena;