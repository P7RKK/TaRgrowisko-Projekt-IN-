import React, { useEffect, useState } from 'react';
import { getAuctionHistory, placeBid } from '../api/auctionAPI';
import { useParams } from 'react-router-dom';

const AuctionDetailsPage = () => {
  const { id } = useParams();
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const data = await getAuctionHistory(id);
        setBids(data.bids);
      } catch (error) {
        console.error('Błąd pobierania historii:', error.message);
      }
    };

    fetchBids();
  }, [id]);

  const handleBid = async () => {
    try {
      const token = localStorage.getItem('token'); // Pobierz token użytkownika
      await placeBid({ auctionId: id, amount }, token);
      alert('Oferta została złożona!');
    } catch (error) {
      console.error('Błąd składania oferty:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold">Szczegóły Aukcji</h1>
      <div className="mt-4">
        <label className="block mb-2">Twoja oferta:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={handleBid}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Złóż ofertę
        </button>
      </div>
      <h2 className="text-2xl font-semibold mt-6">Historia licytacji:</h2>
      <ul>
        {bids.map((bid, index) => (
          <li key={index}>
            {bid.email} - {bid.amount} PLN
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionDetailsPage;
