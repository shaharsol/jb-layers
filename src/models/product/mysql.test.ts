/* eslint-disable import/first */
import path from 'path'
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '../../config')
import query from '../../db/mysql'
import { v4 } from 'uuid'
import product from './mysql'

jest.mock('../../db/mysql', () => ({
    ...jest.requireActual('../../db/mysql'),
    __esModule: true,
    default: jest.fn()
}))

describe('test products mysql implementation', () => {
    describe('test getOne', () => {
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
            const res = await product.getOne(id)
            expect(res).toHaveProperty('id')
            expect(res.id).toEqual(id)
            expect(res).toHaveProperty('name')
            expect(res.name).toEqual(name)
            expect(res).toHaveProperty('price')
            expect(res.price).toEqual(price)
            expect(res).toHaveProperty('stock')
            expect(res.stock).toEqual(stock)
            expect(res).toHaveProperty('imageName')
            expect(res.imageName).toEqual(imageName)
        })
    })
})
