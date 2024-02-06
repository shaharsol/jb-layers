import { Router } from 'express';
import { getAll, getOne, insert } from '../controllers/products/controller'
import { newProductValidator } from '../controllers/products/validator'
import validate from '../middlewares/input-validation'
import expressFileUpload from "express-fileupload";
import addImageToBody from '../middlewares/add-image-to-body';
import uploadImage from '../middlewares/upload-image';

const router = Router();
router.use(expressFileUpload());

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', addImageToBody, validate(newProductValidator), uploadImage ,insert)

export default router;