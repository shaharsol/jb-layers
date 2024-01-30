import { Router } from 'express';
import validate from '../middlewares/input-validation'
import enforceAuth from '../middlewares/enforce-auth';

const router = Router();
router.use(enforceAuth)
router.get('/', () => {
    console.log('got inside categories')
})

export default router;