import { Request, Response } from 'express'
import Product from '../models/product/mysql'

export async function getAll(req: Request, res: Response) {
    const product = new Product(req.execute);
    const products = await product.getAll();
    res.json(products)
}

export async function insert(req: Request, res: Response) {
    const product = new Product(req.execute);
    const newProduct = await product.insert(req.body);
    res.json(newProduct)
}