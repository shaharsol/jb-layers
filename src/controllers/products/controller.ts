import { Request, Response } from 'express'
import productModel from '../../models/product/mysql'

export async function getAll(req: Request, res: Response) {
    const products = await productModel.getAll();
    res.json(products)
}

export async function insert(req: Request, res: Response) {
    const newProduct = await productModel.insert(req.body);
    res.json(newProduct)
}