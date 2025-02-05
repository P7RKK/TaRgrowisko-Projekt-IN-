import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResultsPage.css';

const SearchResultsPage = ({ hideSuggestions, setQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, results } = location.state || { query: '', results: [] };

  const [filteredResults, setFilteredResults] = useState(results);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [platformFilter, setPlatformFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (hideSuggestions) {
      hideSuggestions();
    }
  }, [hideSuggestions]);

  const applyFilters = () => {
    let filtered = results;

    if (categoryFilter) {
      filtered = filtered.filter((result) => result.category === categoryFilter);
    }

    filtered = filtered.filter(
      (result) =>
        (!priceRange.min || result.price >= priceRange.min) &&
        (!priceRange.max || result.price <= priceRange.max)
    );

    if (platformFilter) {
      filtered = filtered.filter((result) => result.platform === platformFilter);
    }

    if (sortOption === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredResults(filtered);
  };

  const handleResultClick = (result) => {
    setQuery(result.name);
    navigate('/search-results', {
      state: { query: result.name, results: [result] },
    });
    if (hideSuggestions) {
      hideSuggestions();
    }
  };

  return (
    <div className="search-results-page">
      <aside className="filters">
        <h2>Filtry</h2>

        <label>Kategoria:</label>
        <select
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Wszystkie</option>
          <option value="RPG">RPG</option>
          <option value="Akcja">Akcja</option>
          <option value="Strategia">Strategia</option>
        </select>

        <label>Platforma:</label>
        <select
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Wszystkie</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
        </select>

        <label>Zakres cen:</label>
        <input
          type="number"
          placeholder="Min"
          value={priceRange.min}
          onChange={(e) =>
            setPriceRange({ ...priceRange, min: Number(e.target.value) })
          }
          className="filter-input"
        />
        <input
          type="number"
          placeholder="Max"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange({ ...priceRange, max: Number(e.target.value) })
          }
          className="filter-input"
        />

        <label>Sortuj według:</label>
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="filter-select"
        >
          <option value="">Domyślnie</option>
          <option value="price-asc">Cena: Rosnąco</option>
          <option value="price-desc">Cena: Malejąco</option>
        </select>

        <button onClick={applyFilters} className="filter-button">
          Zastosuj filtry
        </button>
      </aside>

      <section className="results">
        <h2>Wyniki wyszukiwania dla: {query}</h2>
        {filteredResults.length > 0 ? (
          <ul className="results-list">
            {filteredResults.map((result) => (
              <li
                key={result.id}
                className="result-card"
                onClick={() => handleResultClick(result)}
                style={{ cursor: 'pointer' }}
              >
                <div className="result-thumbnail-container">
                  <img
                    src={result.thumbnail || 'https://via.placeholder.com/150'}
                    alt={result.name}
                    className="result-thumbnail"
                  />
                </div>
                <div className="result-info">
                  <h3>{result.name}</h3>
                  <p>Kategoria: {result.category}</p>
                  <p>Platforma: {result.platform}</p>
                  <p className="price">Cena: {result.price || 'Brak ceny'} PLN</p>
                  <div className="button-container">
                    <button className="details-button">Szczegóły</button>
                    <button className="add-to-cart-button">Dodaj do koszyka</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">Brak wyników spełniających kryteria.</p>
        )}
      </section>
    </div>
  );
};

export default SearchResultsPage;
