import React, { useState } from 'react';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Cyberpunk 2077',
      price: 199.99,
      quantity: 1,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Elden Ring',
      price: 249.99,
      quantity: 2,
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Koszyk</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>Cena jednostkowa: {item.price.toFixed(2)} PLN</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      min="1"
                    />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p>Razem: {(item.price * item.quantity).toFixed(2)} PLN</p>
                  <button className="remove-item-button" onClick={() => removeItem(item.id)}>
                    Usuń
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Twój koszyk jest pusty.</p>
          )}
        </div>
        <div className="cart-summary">
          <h2>Podsumowanie</h2>
          <p>Całkowita cena: {getTotalPrice()} PLN</p>
          <button className="checkout-button" disabled={cartItems.length === 0}>
            Przejdź do płatności
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
