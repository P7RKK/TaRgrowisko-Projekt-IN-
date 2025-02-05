const request = require('supertest');
const app = require('../server');

describe('Integracja PayPal', () => {
  it('powinna utworzyć transakcję PayPal', async () => {
    const res = await request(app)
      .post('/api/payments/paypal/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        auctionId: 'auctionId123',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('orderId');
  });

  it('powinna sfinalizować transakcję PayPal', async () => {
    const res = await request(app)
      .post('/api/payments/paypal/capture')
      .set('Authorization', `Bearer ${token}`)
      .send({
        orderId: 'testOrderId',
        auctionId: 'auctionId123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Płatność PayPal została pomyślnie przetworzona');
  });
});
