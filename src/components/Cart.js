import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();  // Hook do wysyłania akcji do store
  const cartItems = useSelector(state => state.cart.items);  // Pobranie produktów z koszyka z store

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));  // Usuwanie produktu z koszyka
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity(productId, quantity));  // Zmiana ilości produktu
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);  // Obliczanie łącznej ceny
  };

  return (
    <div className="cart-container">
      <h1>Twój Koszyk</h1>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <p>{item.name}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
              />
              <p>{item.price * item.quantity} zł</p>
            </div>
            <button onClick={() => handleRemove(item.id)}>Usuń</button>
          </div>
        ))}
      </div>
      <div className="total">
        <h2>Łączna cena: {calculateTotal()} zł</h2>
      </div>
      <button className="checkout-button">Przejdź do Płatności</button>
    </div>
  );
};

export default Cart;
