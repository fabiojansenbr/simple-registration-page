const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/api/v1/');
        expect(response.statusCode).toBe(200);
    });

    test('It should response the GET method', async () => {
        const response = await request(app).get('/api/v1/blabla');
        expect(response.statusCode).toBe(404);
    });
})