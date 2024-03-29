import { NextFunction, Request, Response } from 'express'
import getModel from '../../models/product/factory'
import DTO from '../../models/product/dto'

export async function getAll (req: Request, res: Response, next: NextFunction) {
    try {
        const products = await getModel().getAll()
        return res.json(products)
    } catch (err) {
        return next(err)
    }
}

export async function getOne (req: Request, res: Response, next: NextFunction) {
    try {
        const product = await getModel().getOne(+req.params.id)
        res.json(product)
    } catch (err) {
        next(err)
    }
}
export async function insert (req: Request, res: Response, next: NextFunction) {
    try {
        const newProduct = await getModel().insert(req.body as DTO)
        res.json(newProduct)
    } catch (err) {
        next(err)
    }
}
