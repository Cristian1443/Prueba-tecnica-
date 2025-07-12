import request from 'supertest';
import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.send('🎉 ¡API de Foodboleros Inventario funcionando!');
});

describe('API de Foodboleros', () => {

  describe('GET /', () => {
    it('should return 200 OK with a welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.text).toEqual('🎉 ¡API de Foodboleros Inventario funcionando!');
    });
  });



}); 