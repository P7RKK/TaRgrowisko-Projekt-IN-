const request = require('supertest');
const app = require('../server');
const path = require('path');

describe('Tworzenie aukcji z przesyłaniem zdjęć', () => {
  it('powinna utworzyć aukcję z przesłanymi zdjęciami', async () => {
    const res = await request(app)
      .post('/api/auctions')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Nowa aukcja')
      .field('description', 'Opis aukcji')
      .field('startingPrice', 100)
      .field('endTime', new Date(Date.now() + 3600 * 1000).toISOString())
      .attach('images', path.resolve(__dirname, './files/test-image1.jpg'))
      .attach('images', path.resolve(__dirname, './files/test-image2.jpg'));

    expect(res.statusCode).toBe(201);
    expect(res.body.auction.images).toHaveLength(2);
  });
});
