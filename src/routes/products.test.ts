import server from '../app'
import request from 'supertest'
import query from '../db/mysql'
import { v4 } from 'uuid'

jest.mock('../db/mysql', () => ({
    ...jest.requireActual('../db/mysql'),
    __esModule: true,
    default: jest.fn()
}))

describe('test products router', () => {
    describe('test /api/products/1 endpoint', () => {
        it('should return single product with id=1', async () => {
            const id = 999
            const name = v4()
            const price = 999
            const stock = 999
            const imageName = v4()
            query.mockResolvedValue([{
                id,
                name,
                price,
                stock,
                imageName
            }])
            const res = await request(server).get(`/api/products/${id}`)
            expect(res.statusCode).toBe(200)
            console.log(res.body)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toEqual(id)
            expect(res.body).toHaveProperty('name')
            expect(res.body.name).toEqual(name)
            expect(res.body).toHaveProperty('price')
            expect(res.body.price).toEqual(price)
            expect(res.body).toHaveProperty('stock')
            expect(res.body.stock).toEqual(stock)
            expect(res.body).toHaveProperty('imageName')
            expect(res.body.imageName).toEqual(imageName)
        })
    })
})
