/*
npm i jest @types-jest ts-jest -D
npx ts-jest config:init
add npm test in package json to be simply jest
then run npm test
*/

import { hashPassword } from './crypto'
import { v4 } from 'uuid'

describe('crypto tests', () => {
    describe('hashing passwords', () => {
        it('generates a valid md5', () => {
            const hash = hashPassword(v4(), v4())
            expect(hash).toBeDefined()
            expect(hash).toMatch(/^[a-f0-9]{32}$/gi)
        })
        it('generates the same hash for the same password', () => {
            const secret = v4()
            const password = v4()
            const hash1 = hashPassword(password, secret)
            const hash2 = hashPassword(password, secret)
            expect(hash1).toEqual(hash2)
        })
        it('generates a different hash for a different password', () => {
            const secret = v4()
            const password1 = v4()
            const password2 = v4()
            const hash1 = hashPassword(password1, secret)
            const hash2 = hashPassword(password2, secret)
            expect(hash1).not.toEqual(hash2)
        })
    })
})
