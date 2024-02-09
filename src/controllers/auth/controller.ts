import { NextFunction, Request, Response } from 'express'
import createHttpError, { Unauthorized } from 'http-errors'
import getModel from '../../models/auth/factory'
import UserDTO from '../../models/auth/user-dto'
import CredentialsDTO from '../../models/auth/credentials-dto'

export async function signup (req: Request, res: Response, next: NextFunction) {
    try {
        const jwt = await getModel().signup(req.body as UserDTO)
        res.json({ jwt })
    } catch (err) {
        next(err)
    }
}

export async function login (req: Request, res: Response, next: NextFunction) {
    try {
        const jwt = await getModel().login(req.body as CredentialsDTO)
        if (jwt) {
            return res.json({ jwt })
        }
        next(createHttpError(Unauthorized('unknown username and password combination')))
    } catch (err) {
        next(err)
    }
}
