import React, { useEffect, useState } from 'react';

const AllAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    daysLeft: 10,
    user: '',
    minPrice: 0,
    status: '',
    startDate: '',
  });

  useEffect(() => {
    // Placeholder data for testing
    const dummyData = Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      title: `Aukcja ${index + 1}`,
      description: `Opis dla aukcji ${index + 1}. Jest to przykładowy opis, aby zaprezentować placeholdery w działaniu.`,
      startingPrice: Math.floor(Math.random() * 500) + 100,
      category: index % 2 === 0 ? 'Elektronika' : 'Motoryzacja',
      image: `https://via.placeholder.com/300?text=Aukcja+${index + 1}`,
      user: `Użytkownik${index + 1}`,
      daysLeft: Math.floor(Math.random() * 10) + 1,
      status: index % 2 === 0 ? 'Aktywna' : 'Zakończona',
      startDate: `2023-12-${index + 1}`,
    }));
    setAuctions(dummyData);
  }, []);

  const applyFilters = () => {
    return auctions.filter((auction) => {
      const matchesCategory = filters.category ? auction.category === filters.category : true;
      const matchesPrice =
        auction.startingPrice >= filters.priceRange[0] &&
        auction.startingPrice <= filters.priceRange[1];
      const matchesDaysLeft = auction.daysLeft <= filters.daysLeft;
      const matchesUser = filters.user ? auction.user.toLowerCase().includes(filters.user.toLowerCase()) : true;
      const matchesMinPrice = auction.startingPrice >= filters.minPrice;
      const matchesStatus = filters.status ? auction.status === filters.status : true;
      const matchesStartDate = filters.startDate ? new Date(auction.startDate) >= new Date(filters.startDate) : true;

      return (
        matchesCategory &&
        matchesPrice &&
        matchesDaysLeft &&
        matchesUser &&
        matchesMinPrice &&
        matchesStatus &&
        matchesStartDate
      );
    });
  };

  const filteredAuctions = applyFilters();

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Filters Section */}
      <div style={{ width: '250px', marginRight: '20px', background: '#1e1e1e', padding: '15px', borderRadius: '10px', color: '#fff' }}>
        <h2 style={{ marginBottom: '15px' }}>Filtry</h2>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="category">Kategoria</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', background: '#333', color: '#fff', border: 'none' }}
          >
            <option value="">Wszystkie</option>
            <option value="Elektronika">Elektronika</option>
            <option value="Motoryzacja">Motoryzacja</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="priceRange">Zakres cen</label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="1000"
            step="50"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
            style={{ width: '100%', marginTop: '5px' }}
          />
          <p style={{ marginTop: '10px' }}>Maksymalna cena: {filters.priceRange[1]} PLN</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="minPrice">Minimalna cena</label>
          <input
            type="number"
            id="minPrice"
            min="0"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) || 0 })}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', background: '#333', color: '#fff', border: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="daysLeft">Dni do zakończenia</label>
          <input
            type="number"
            id="daysLeft"
            min="1"
            max="30"
            value={filters.daysLeft}
            onChange={(e) => setFilters({ ...filters, daysLeft: parseInt(e.target.value) })}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', background: '#333', color: '#fff', border: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="user">Użytkownik</label>
          <input
            type="text"
            id="user"
            value={filters.user}
            onChange={(e) => setFilters({ ...filters, user: e.target.value })}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', background: '#333', color: '#fff', border: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', background: '#333', color: '#fff', border: 'none' }}
          >
            <option value="">Wszystkie</option>
            <option value="Aktywna">Aktywna</option>
            <option value="Zakończona">Zakończona</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="startDate">Data wystawienia (od)</label>
          <input
            type="date"
            id="startDate"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', background: '#333', color: '#fff', border: 'none' }}
          />
        </div>
      </div>

      {/* Auctions Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          justifyItems: 'center',
          flex: 1,
        }}
      >
        {filteredAuctions.map((auction) => (
          <div
            key={auction.id}
            style={{
              width: '300px',
              background: '#262626',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={auction.image}
              alt={auction.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '15px', color: '#fff' }}>
              <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>{auction.title}</h3>
              <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '10px' }}>
                {auction.description}
              </p>
              <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '5px' }}>
                Wystawiona przez: {auction.user}
              </p>
              <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '15px' }}>
                Dni do zakończenia: {auction.daysLeft}
              </p>
              <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
                Cena wywoławcza: {auction.startingPrice} PLN
              </p>
              <button
                style={{
                  padding: '10px 15px',
                  background: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px',
                  transition: 'background 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.background = '#45a049')}
                onMouseOut={(e) => (e.target.style.background = '#4CAF50')}
              >
                Zobacz Szczegóły
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAuctions;
