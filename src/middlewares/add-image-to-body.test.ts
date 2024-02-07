import { Request, Response } from 'express';
import addImageToBody from './add-image-to-body';
import { v4 } from 'uuid';

describe('add-image-to-body', () => {
    it('adds image to body', () => {
        const req = {
            body: {
            },
            files: {
                image: v4()
            }
        } as unknown as Request;
        const res = {} as Response;
        const next = jest.fn(() => {});
        addImageToBody(req, res, next);
        expect(req.body.image).toEqual(req.files.image)
    })
})