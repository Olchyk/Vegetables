const request = require('supertest');
const server = require('../index');
//тестування
describe('Тестування API сервера', () => {
  afterAll(() => {
    server.close();
  });

  test('Головна сторінка повинна повертати статус 200', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<!DOCTYPE html>');
  });

  test('API /api повинно повертати JSON', async () => {
    const response = await request(server).get('/api');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('Сторінка продукту повинна повертати статус 200', async () => {
    const response = await request(server).get('/product?id=0');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<!DOCTYPE html>');
  });

  test('Несуществуюча сторінка повинна повертати 404', async () => {
    const response = await request(server).get('/non-existing-page');
    expect(response.status).toBe(404);
    expect(response.text).toContain('Page not found!');
  });
});
