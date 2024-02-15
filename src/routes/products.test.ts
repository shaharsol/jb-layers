import server from '../app'
import request from 'supertest'

jest.mock('../db/mysql', () => ({
    ...jest.requireActual('../db/mysql'),
    __esModule: true,
    default: jest.fn().mockResolvedValue([{
        id: 2
    }])
}))
// import query from '../db/mysql'

describe('test products router', () => {
    describe('test /api/products/1 endpoint', () => {
        it('should return single product with id=1', async () => {
            const res = await request(server).get('/api/products/1')
            expect(res.statusCode).toBe(200)
            console.log(res.body)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toBe(2)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('stock')
            expect(res.body).toHaveProperty('imageName')
        })
    })
})
