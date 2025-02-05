import React, { useEffect, useState } from 'react';

const MyAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    title: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    endDate: '',
  });
  const [selectedAuction, setSelectedAuction] = useState(null);

  useEffect(() => {
    // Placeholder data for testing
    const dummyData = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Moja Aukcja ${index + 1}`,
      description: `Opis mojej aukcji ${index + 1}. Szczegóły można zobaczyć po rozwinięciu.`,
      startingPrice: Math.floor(Math.random() * 500) + 100,
      status: index % 2 === 0 ? 'Aktywna' : 'Zakończona',
      category: index % 2 === 0 ? 'RPG' : 'FPS',
      bids: Math.floor(Math.random() * 20),
      endDate: `2024-12-${10 + index}`,
      image: `https://via.placeholder.com/300?text=Aukcja+${index + 1}`,
    }));
    setAuctions(dummyData);
  }, []);

  const applyFilters = () => {
    return auctions.filter((auction) => {
      const matchesStatus = filters.status ? auction.status === filters.status : true;
      const matchesTitle = filters.title ? auction.title.toLowerCase().includes(filters.title.toLowerCase()) : true;
      const matchesCategory = filters.category ? auction.category === filters.category : true;
      const matchesMinPrice = filters.minPrice ? auction.startingPrice >= parseInt(filters.minPrice) : true;
      const matchesMaxPrice = filters.maxPrice ? auction.startingPrice <= parseInt(filters.maxPrice) : true;
      const matchesEndDate = filters.endDate ? new Date(auction.endDate) <= new Date(filters.endDate) : true;

      return matchesStatus && matchesTitle && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesEndDate;
    });
  };

  const filteredAuctions = applyFilters();

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px', background: '#2c2c2c', color: '#ffffff' }}>
      {/* Filters Section */}
      <div style={{ width: '250px', background: '#3e3e3e', padding: '15px', borderRadius: '10px', border: '1px solid #555' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#ffffff' }}>Filtry</h2>
        <input
          type="text"
          placeholder="Szukaj po tytule"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          style={{ padding: '10px', width: '100%', marginBottom: '15px', borderRadius: '8px', border: '1px solid #666', background: '#2c2c2c', color: '#fff', fontSize: '14px' }}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={{ padding: '10px', width: '100%', marginBottom: '15px', borderRadius: '8px', border: '1px solid #666', background: '#2c2c2c', color: '#fff', fontSize: '14px' }}
        >
          <option value="">Wszystkie Statusy</option>
          <option value="Aktywna">Aktywna</option>
          <option value="Zakończona">Zakończona</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          style={{ padding: '10px', width: '100%', marginBottom: '15px', borderRadius: '8px', border: '1px solid #666', background: '#2c2c2c', color: '#fff', fontSize: '14px' }}
        >
          <option value="">Wszystkie Kategorie</option>
          <option value="Elektronika">Elektronika</option>
          <option value="Motoryzacja">Motoryzacja</option>
        </select>
        <input
          type="number"
          placeholder="Min. Cena"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          style={{ padding: '10px', width: '100%', marginBottom: '15px', borderRadius: '8px', border: '1px solid #666', background: '#2c2c2c', color: '#fff', fontSize: '14px' }}
        />
        <input
          type="number"
          placeholder="Max. Cena"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          style={{ padding: '10px', width: '100%', marginBottom: '15px', borderRadius: '8px', border: '1px solid #666', background: '#2c2c2c', color: '#fff', fontSize: '14px' }}
        />
        <input
          type="date"
          placeholder="Data zakończenia"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          style={{ padding: '10px', width: '100%', marginBottom: '15px', borderRadius: '8px', border: '1px solid #666', background: '#2c2c2c', color: '#fff', fontSize: '14px' }}
        />
      </div>

      {/* Auctions List */}
      <div style={{ flex: 1 }}>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {filteredAuctions.map((auction) => (
            <li
              key={auction.id}
              style={{
                padding: '15px',
                marginBottom: '15px',
                border: '1px solid #555',
                borderRadius: '10px',
                background: '#3e3e3e',
                cursor: 'pointer',
                color: '#fff',
                transition: 'transform 0.3s, background-color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.backgroundColor = '#505050';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#3e3e3e';
              }}
              onClick={() => setSelectedAuction(auction)}
            >
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{auction.title}</span>
              <span style={{ float: 'right', color: '#ccc' }}>{auction.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Detailed View */}
      {selectedAuction && (
        <div style={{ width: '350px', border: '1px solid #555', borderRadius: '10px', padding: '20px', background: '#3e3e3e', color: '#fff' }}>
          <img
            src={selectedAuction.image}
            alt={selectedAuction.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '15px', borderRadius: '10px' }}
          />
          <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#fff' }}>{selectedAuction.title}</h3>
          <p style={{ marginBottom: '10px' }}>{selectedAuction.description}</p>
          <p style={{ marginBottom: '10px', color: '#ccc' }}>Kategoria: {selectedAuction.category}</p>
          <p style={{ marginBottom: '10px', color: '#ccc' }}>Cena wywoławcza: {selectedAuction.startingPrice} PLN</p>
          <p style={{ marginBottom: '10px', color: '#ccc' }}>Liczba ofert: {selectedAuction.bids}</p>
          <p style={{ marginBottom: '15px', color: '#ccc' }}>Data zakończenia: {selectedAuction.endDate}</p>
          {selectedAuction.status === 'Aktywna' && (
            <button
              style={{
                padding: '10px 20px',
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#c0392b')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}
              onClick={() => alert(`Aukcja "${selectedAuction.title}" została zakończona.`)}
            >
              Zakończ Aukcję
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAuctions;
