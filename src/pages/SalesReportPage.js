import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { fetchSellerSales } from '../api';

const RaportSprzedazy = () => {
  const [sprzedaze, setSprzedaze] = useState([]);

  useEffect(() => {
    const pobierzSprzedaze = async () => {
      try {
        const { data } = await fetchSellerSales();
        setSprzedaze(data);
      } catch (error) {
        console.error('Błąd podczas pobierania sprzedaży:', error);
      }
    };

    pobierzSprzedaze();
  }, []);

  const generujPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('Raport sprzedaży', 10, 10);
    sprzedaze.forEach((sprzedaz, index) => {
      pdf.text(
        `${index + 1}. Produkt: ${sprzedaz.product}, Kwota: ${sprzedaz.amount} zł`,
        10,
        20 + index * 10
      );
    });
    pdf.save('raport_sprzedazy.pdf');
  };

  return (
    <div className="container mt-10">
      <h1 className="text-3xl font-bold mb-4">Raport sprzedaży</h1>
      <button onClick={generujPDF} className="button-primary mb-4">
        Pobierz raport jako PDF
      </button>
      <ul>
        {sprzedaze.map((sprzedaz, index) => (
          <li key={index} className="mb-2">
            {index + 1}. Produkt: {sprzedaz.product}, Kwota: {sprzedaz.amount} zł
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RaportSprzedazy;