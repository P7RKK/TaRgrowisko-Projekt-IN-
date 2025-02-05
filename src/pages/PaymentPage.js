import React, { useState } from 'react';
import './PaymentPage.css';

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handlePaymentSubmit = () => {
    if (!selectedPayment) {
      alert('Wybierz metodę płatności!');
    } else {
      alert(`Płatność wybrana: ${selectedPayment}`);
    }
  };

  return (
    <div className="payment-page">
      <h1>Podsumowanie zamówienia</h1>
      <div className="payment-container">
        {/* Sekcja podsumowania zamówienia */}
        <div className="order-summary">
          <h2>Twoje zamówienie</h2>
          <ul>
            <li>
              <span>Cyberpunk 2077</span>
              <span>120 zł</span>
            </li>
            <li>
              <span>Wiedźmin 3: Dziki Gon</span>
              <span>80 zł</span>
            </li>
          </ul>
          <hr />
          <div className="order-total">
            <span>Razem:</span>
            <span>200 zł</span>
          </div>
        </div>

        {/* Sekcja wyboru metody płatności */}
        <div className="payment-method">
          <h2>Wybierz metodę płatności</h2>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="Karta kredytowa"
                onChange={() => handlePaymentSelect('Karta kredytowa')}
              />
              <span>Karta kredytowa</span>
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Blik"
                onChange={() => handlePaymentSelect('Blik')}
              />
              <span>Blik</span>
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="PayPal"
                onChange={() => handlePaymentSelect('PayPal')}
              />
              <span>PayPal</span>
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Przelew bankowy"
                onChange={() => handlePaymentSelect('Przelew bankowy')}
              />
              <span>Przelew bankowy</span>
            </label>
          </div>
        </div>
      </div>

      {/* Przycisk do złożenia zamówienia */}
      <button className="confirm-payment-button" onClick={handlePaymentSubmit}>
        Zatwierdź płatność
      </button>
    </div>
  );
};

export default PaymentPage;
