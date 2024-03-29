import config from 'config'
import { NextFunction, Request, Response } from 'express'
import createHttpError, { Unauthorized } from 'http-errors'
import { verify } from 'jsonwebtoken'

export default function enforceAuth (req: Request, res: Response, next: NextFunction) {
    try {
        const header = req.header('authorization')
        if (!header) return next(createHttpError(Unauthorized('missing authorization header')))
        const token = header.split(' ')[1]
        verify(token, config.get<string>('app.secret'))
        next()
    } catch (err) {
        return next(createHttpError(Unauthorized(err.message)))
    }
}

/*
extending the Request object to contain user
declare global {
  namespace Express {
    export interface Request {
      language?: Language;
      user?: User;
    }
  }
}
*/
