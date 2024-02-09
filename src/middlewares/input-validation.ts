import joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import createHttpError, { BadRequest, InternalServerError } from 'http-errors'
import { ReasonPhrases } from 'http-status-codes'

const middleware = (validator: joi.ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = await validator.validateAsync(req.body, {
            abortEarly: false
        })
        req.body = validated
        return next()
    } catch (err) {
        if (err.isJoi) {
            return next(createHttpError(BadRequest(err.message)))
        }
        return next(createHttpError(InternalServerError(ReasonPhrases.INTERNAL_SERVER_ERROR)))
    }
}

export default middleware
