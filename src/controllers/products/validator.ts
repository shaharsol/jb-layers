import joi from 'joi';
import DTO from '../../models/product/dto';

export const newProductValidator = joi.object<DTO>({
    name: joi.string().required(),
    price: joi.number().min(0).max(1000).required(),
    stock: joi.number().required(),
    image: joi.object({
        mimetype: joi.string().valid('image/png', 'image/jpg')
    }).unknown(true).optional()
});
