import { Router } from 'express'
import enforceAuth from '../middlewares/enforce-auth'

const router = Router()
router.use(enforceAuth)
router.get('/', () => {
    console.log('got inside categories')
})

export default router
