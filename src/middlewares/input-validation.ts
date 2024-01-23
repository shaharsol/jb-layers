import joi from "joi";
import { Request, Response, NextFunction } from 'express'

const middleware = (validator: joi.ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = await validator.validateAsync(req.body);
        req.body = validated;
        return next();
      
    } catch (err) {
        //* Pass err to next
        //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
        if (err.isJoi) { 
            return next({
                status: 422, 
                message: err.message 
            }); 
        }
        return next({
            status: 500,
            message: 'internal server error'
        });
    }
  };

export default middleware;