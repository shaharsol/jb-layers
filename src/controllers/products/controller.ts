import { Request, Response } from 'express'
import productModel from '../../models/product/mysql'
import { getProductModel } from '../../models/product/factory'

export async function getAll(req: Request, res: Response) {
    const products = await getProductModel().getAll();
    res.json(products)
}

export async function insert(req: Request, res: Response) {
    const newProduct = await getProductModel().insert(req.body);
    res.json(newProduct)
}