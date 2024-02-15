import server from '../app'
import request from 'supertest'
import { pool } from '../db/mysql'

describe('test products router', () => {
    afterAll(() => {
        pool.end()
    })
    // integration test
    describe('test /api/products endpoint', () => {
        it('should return an array of products', async () => {
            const res = await request(server).get('/api/products')
            expect(res.statusCode).toBe(200)
            expect(Array.isArray(res.body)).toBeTruthy()
            expect(res.body[0]).toHaveProperty('id')
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('price')
            expect(res.body[0]).toHaveProperty('stock')
            expect(res.body[0]).toHaveProperty('imageName')
        })
    })
    // unit test
    describe('test /api/products/1 endpoint', () => {
        it('should return single product with id=1', async () => {
            jest.mock('../db/mysql', () => {
                return {
                    default: jest.fn(() => [{
                        id: 1,
                        name: 'chai',
                        price: 18,
                        stock: 6,
                        imageName: 'a'
                    }])
                }
            })
            const res = await request(server).get('/api/products/1')
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toBe(1)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('stock')
            expect(res.body).toHaveProperty('imageName')
        })
    })
})
