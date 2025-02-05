import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = useState({ users: 0, auctions: 0, blockedUsers: 0 });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/reports', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setReports(data);
      } catch (err) {
        console.error('Błąd podczas pobierania raportów:', err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Raporty</h2>
      <ul>
        <li>Liczba użytkowników: {reports.users}</li>
        <li>Liczba aukcji: {reports.auctions}</li>
        <li>Zablokowani użytkownicy: {reports.blockedUsers}</li>
      </ul>
    </div>
  );
};

export default Reports;
