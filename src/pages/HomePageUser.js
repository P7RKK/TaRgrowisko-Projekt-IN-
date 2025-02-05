// Główna strona dla zalogowanego użytkownika
import React, { useRef } from 'react';
import Footer from '../components/Footer';
import './HomePageUser.css';



const HomePageUser = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const slides = [
    { image: '/images/popular/cyberpunk.jpg', title: 'Cyberpunk 2077', price: '149,99 zł' },
    { image: '/images/popular/elden.jpg', title: 'Elden Ring', price: '249,99 zł' },
    { image: '/images/popular/witcher3.jpg', title: 'The Witcher 3', price: '59,99 zł' },
    { image: '/images/popular/fifa.jpg', title: 'EA SPORTS FC25', price: '199,99 zł' },
    { image: '/images/popular/minecraft.jpg', title: 'Minecraft', price: '99,99 zł' },
    { image: '/images/hogwartslegacy.jpg', title: 'Hogwarts Legacy', price: '229,99 zł' },
    { image: '/images/reddeadredemption2.jpg', title: 'Red Dead Redemption 2', price: '149,99 zł' },
    { image: '/images/assassinscreedvalhalla.jpg', title: 'Assassin\'s Creed Valhalla', price: '199,99 zł' },
  ];

  return (
    <div className="homepage-user">
      {/* Sekcja Gorącej Oferty */}
      <section className="hot-deal">
        <div className="hot-deal-content">
          <h1>Gorąca Oferta!</h1>
          <p>Najlepsza oferta cenowa: Wiedźmin 2: Zabójcy Królów</p>
          <button className="cta-button">Kup teraz</button>
        </div>
        <div className="hot-deal-image">
          <img src="/images/hot_deal_game.jpg" alt="The Witcher 2" />
          <div className="hot-deal-badge">
            <i className="fas fa-fire"></i> HOT DEAL
          </div>
        </div>
      </section>


      {/* Slider */}
      <section className="slider">
        <h2>Popularne</h2>
        <div className="slider-wrapper">
          <button className="slider-button left" onClick={scrollLeft}>&#8249;</button>
          <div className="slider-container" ref={sliderRef}>
            {slides.map((slide, index) => (
              <div className="slide" key={index}>
                <img src={slide.image} alt={slide.title} />
                <h3>{slide.title}</h3>
                <p>{slide.price}</p>
              </div>
            ))}
          </div>
          <button className="slider-button right" onClick={scrollRight}>&#8250;</button>
        </div>
      </section>

      <section className="slider">
        <h2>Nowe wydania</h2>
        <div className="slider-wrapper">
          <button className="slider-button left" onClick={scrollLeft}>&#8249;</button>
          <div className="slider-container" ref={sliderRef}>
            {slides.map((slide, index) => (
              <div className="slide" key={index}>
                <img src={slide.image} alt={slide.title} />
                <h3>{slide.title}</h3>
                <p>{slide.price}</p>
              </div>
            ))}
          </div>
          <button className="slider-button right" onClick={scrollRight}>&#8250;</button>
        </div>
      </section>

      {/* Odkryj kategorie */}
      <section className="categories">
        <h2>Odkryj kategorie</h2>
        <div className="categories-container">
          <div className="category-card">
            <h3>RPG</h3>
            <img src="/images/rpg-category.jpg" alt="RPG" />
            <button className="explore-button">Zobacz więcej</button>
          </div>
          <div className="category-card">
            <h3>FPS</h3>
            <img src="/images/fps-category.jpg" alt="FPS" />
            <button className="explore-button">Zobacz więcej</button>
          </div>
          <div className="category-card">
            <h3>Strategiczne</h3>
            <img src="/images/strategy-category.jpg" alt="Strategiczne" />
            <button className="explore-button">Zobacz więcej</button>
          </div>
          <div className="category-card">
            <h3>Przygodowe</h3>
            <img src="/images/adventure-category.jpg" alt="Przygodowe" />
            <button className="explore-button">Zobacz więcej</button>
          </div>
          <div className="category-card">
            <h3>Wyścigowe</h3>
            <img src="/images/racing-category.jpg" alt="Wyścigowe" />
            <button className="explore-button">Zobacz więcej</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePageUser;