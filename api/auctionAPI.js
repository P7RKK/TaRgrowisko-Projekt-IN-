import axios from 'axios';

// Tworzenie nowej aukcji
export const createAuction = async (formData, token) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post('/api/auctions', formData, config);
  return response.data;
};

// Pobieranie listy aukcji
export const getAuctions = async () => {
  const response = await axios.get('/api/auctions');
  return response.data;
};

// Składanie oferty
export const placeBid = async (bidData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post('/api/auctions/bid', bidData, config);
  return response.data;
};

// Pobieranie historii licytacji
export const getAuctionHistory = async (auctionId) => {
  const response = await axios.get(`/api/auctions/${auctionId}/history`);
  return response.data;
};
