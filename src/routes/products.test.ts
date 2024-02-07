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
        })
    })
})