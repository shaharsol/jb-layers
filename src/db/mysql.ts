import mysql from 'mysql2';
import { promisify } from 'util';
import {Request, Response, NextFunction } from 'express';
import config from 'config'

export const pool = mysql.createPool({
    host: config.get<string>('mysql.host'),
    user: config.get<string>('mysql.user'),
    password: config.get<string>('mysql.password'),
    database: config.get<string>('mysql.database'),
    // waitForConnections: true,
    // connectionLimit: 10,
    // maxIdle: 10,
    // idleTimeout: 60000,
    // queueLimit: 0,
});

// console.log('pool created')

const query = promisify(pool.query).bind(pool);
export default query

