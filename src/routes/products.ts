import { Router } from 'express';
import { getAll, insert } from '../controllers/products/controller'
import { newProductValidator } from '../controllers/products/validator'
import validate from '../middlewares/input-validation'

const router = Router();

router.get('/', getAll)
router.post('/', validate(newProductValidator) ,insert)

export default router;