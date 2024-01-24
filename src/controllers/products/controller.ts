import { Request, Response } from 'express'
import productModel from '../../models/product/mysql'
import getModel from '../../models/product/factory'
import DTO from '../../models/product/dto';

export async function getAll(req: Request, res: Response) {
    const products = await getModel().getAll();
    res.json(products)
}

export async function insert(req: Request, res: Response) {
    const newProduct = await getModel().insert(req.body as DTO);
    res.json(newProduct)
}