process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
import express from 'express';
import productsRouter from './routes/products'
import mysql from './middlewares/mysql'
import exp from 'constants';

const server = express();

server.use(express.json())
server.use(mysql)
server.use('/products', productsRouter)

server.listen(8080, () => {
    console.log(`server listening on http://localhost:8080`)
})