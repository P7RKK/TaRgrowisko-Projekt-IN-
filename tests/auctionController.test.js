const request = require('supertest');
const app = require('../server');
const Auction = require('../models/Auction');
const Bid = require('../models/Bid');

test('Dodanie nowej oferty', async () => {
  const auction = await Auction.create({
    title: 'Testowa aukcja',
    description: 'Opis aukcji',
    startingPrice: 100,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    creator: '1234567890abcdef12345678',
  });

  const res = await request(app)
    .post('/api/auction/addBid')
    .send({ auctionId: auction._id, amount: 150 });

  expect(res.statusCode).toBe(201);
  expect(res.body.message).toBe('Oferta dodana');
});
