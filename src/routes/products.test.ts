import server from '../app';
import request from 'supertest';
import { pool } from '../db/mysql';

describe('test products router', () => {
    afterAll(() => {
        pool.end()
    })
    describe('test / endpoint', () => {
        it('should return an array of products', async () => {
            const res = await request(server).get('/products')
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0]).toHaveProperty('price');
            expect(res.body[0]).toHaveProperty('stock');
            expect(res.body[0]).toHaveProperty('imageName');
        })
    })
})