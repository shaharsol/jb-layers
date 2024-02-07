import server from '../app';
import request from 'supertest';

describe('test products router', () => {
    describe('test / endpoint', () => {
        it('should return an array of products', async () => {
            const res = await request(server).get('/products')
            expect(res.statusCode).toBe(200);
        })
    })
})