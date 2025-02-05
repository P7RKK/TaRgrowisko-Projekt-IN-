import React, { useState, useEffect } from 'react';
import './AuctionPage.css';

const AuctionPage = () => {
  const [auction, setAuction] = useState({
    id: 1,
    title: 'Gaming Laptop',
    description: 'High-performance gaming laptop with 16GB RAM and RTX 3070.',
    image: 'https://via.placeholder.com/300',
    currentBid: 5000,
    endTime: '2025-01-15T23:59:59',
  });

  const [recommendations, setRecommendations] = useState([
    { id: 2, title: 'Wireless Gaming Mouse', image: 'https://via.placeholder.com/100' },
    { id: 3, title: 'Mechanical Keyboard', image: 'https://via.placeholder.com/100' },
    { id: 4, title: 'Gaming Headset', image: 'https://via.placeholder.com/100' },
  ]);

  const [bids, setBids] = useState([
    { user: 'User1', amount: 4500, time: '2025-01-09T10:30:00' },
    { user: 'User2', amount: 4800, time: '2025-01-09T11:00:00' },
    { user: 'User3', amount: 5000, time: '2025-01-09T11:30:00' },
  ]);

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(auction.endTime);
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Aukcja zakończona');
        clearInterval(timer);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction.endTime]);

  return (
    <div className="auction-page">
      <div className="auction-left">
        <img src={auction.image} alt={auction.title} className="auction-image" />
        <div className="auction-details">
          <h1>{auction.title}</h1>
          <p>{auction.description}</p>
          <p>Aktualna oferta: <strong>{auction.currentBid} PLN</strong></p>
          <p>Czas pozostały: <strong>{timeLeft}</strong></p>
        </div>
      </div>
      <div className="auction-right">
        <h2>Rekomendowane produkty</h2>
        <div className="recommendations">
          {recommendations.map((item) => (
            <div key={item.id} className="recommendation-item">
              <img src={item.image} alt={item.title} className="recommendation-image" />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="auction-bottom">
        <h2>Historia licytacji</h2>
        <table className="bids-table">
          <thead>
            <tr>
              <th>Użytkownik</th>
              <th>Kwota</th>
              <th>Czas</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={index}>
                <td>{bid.user}</td>
                <td>{bid.amount} PLN</td>
                <td>{new Date(bid.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionPage;
