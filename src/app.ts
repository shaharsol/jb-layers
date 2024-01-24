// import path from 'path';
// console.log(__dirname)
// console.log(path.resolve('./'))
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
import express from 'express';
import productsRouter from './routes/products'

const server = express();

server.use(express.json())
server.use('/products', productsRouter)

server.listen(8080, () => {
    console.log(`server listening on http://localhost:8080`)
})