import { Router } from 'express';
import { getAll, insert } from '../controllers/products'

const router = Router();

router.get('/', getAll)
router.post('/', insert)

export default router;