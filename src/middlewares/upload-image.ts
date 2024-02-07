import { NextFunction, Request, Response } from "express";
import { S3 } from 'aws-sdk';
import config from 'config';
import { v4} from 'uuid';
import { UploadedFile } from "express-fileupload";
import path from 'path';

const s3 = new S3({
    accessKeyId: config.get<string>('s3.accessKeyId'),
    secretAccessKey: config.get<string>('s3.secretAccessKey'),
    region: config.get<string>('s3.region'),
    endpoint: config.get<string>('s3.endpoint'),
});

export default async function uploadImage(req: Request, res: Response, next: NextFunction) {
    if (!req.body.image) return next();
    try {
        const image = req.body.image as UploadedFile;

        const imageName = `${v4()}${path.extname(image.name)}`;
        const params = {
            Bucket: config.get<string>('s3.bucket'),
            Key: imageName,
            Body: image.data,
            ACL: "public-read",
            ContentType: image.mimetype
        };
        const data = await s3.upload(params).promise();
        console.log(data.Location)
        // req.body.imageName = data.Location;
        // in 2nd thought this is better
        // we then have to concat the endpoint+bucket
        req.body.imageName = imageName;
        return next()
    
    } catch (err) {
        return next(err)
    }
}