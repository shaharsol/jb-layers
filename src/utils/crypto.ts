import { createHash } from 'crypto';

export function hashPassword (plainTextPassword, secret): string {
    return createHash('md5').update(`${plainTextPassword}${secret}`).digest("hex")
}