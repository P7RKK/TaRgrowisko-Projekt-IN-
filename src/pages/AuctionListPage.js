import React, { useEffect, useState } from 'react';
import { getAuctions } from '../api/auctionAPI';

const AuctionListPage = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAuctions();
        setAuctions(data);
      } catch (error) {
        console.error('Błąd pobierania aukcji:', error.message);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Lista Aukcji</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <div key={auction._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{auction.title}</h2>
            <p>{auction.description}</p>
            <p className="text-lg font-bold mt-2">Cena: {auction.currentPrice} PLN</p>
            <a href={`/auction/${auction._id}`} className="text-blue-500">
              Szczegóły aukcji
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionListPage;
