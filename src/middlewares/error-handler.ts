import { NextFunction, Request, Response } from "express";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.status).send(err.message)
}