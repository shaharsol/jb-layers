import joi from 'joi';

export const newProductValidator = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    stock: joi.number().required()
});
