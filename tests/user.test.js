const { validatePassword } = require('../controllers/userController');
const request = require('supertest');
const app = require('../server');

describe('Password Validation', () => {
  it('should pass for a strong password', () => {
    expect(validatePassword('StrongP@ss1')).toBe(true);
  });

  it('should fail for a password without uppercase', () => {
    expect(validatePassword('weakp@ss1')).toBe(false);
  });

  it('should fail for a password without special characters', () => {
    expect(validatePassword('WeakPass1')).toBe(false);
  });

  it('should fail for a password shorter than 8 characters', () => {
    expect(validatePassword('W@1s')).toBe(false);
  });
});

describe('Rate Limiting', () => {
  it('should limit requests after threshold is reached', async () => {
    for (let i = 0; i < 101; i++) {
      await request(app).get('/api/some-endpoint');
    }

    const res = await request(app).get('/api/some-endpoint');
    expect(res.statusCode).toBe(429);
    expect(res.body.message).toBe('Zbyt wiele żądań. Spróbuj ponownie później.');
  });

  it('should limit login attempts after threshold is reached', async () => {
    for (let i = 0; i < 11; i++) {
      await request(app).post('/api/users/login').send({
        email: 'test@example.com',
        password: '123456',
      });
    }

    const res = await request(app).post('/api/users/login').send({
      email: 'test@example.com',
      password: '123456',
    });

    expect(res.statusCode).toBe(429);
    expect(res.body.message).toBe('Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.');
  });
});
