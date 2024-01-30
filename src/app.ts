// import path from 'path';
// console.log(__dirname)
// console.log(path.resolve('./'))
// console.log(process.env.NODE_ENV)
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
import express from 'express';
import productsRouter from './routes/products'
import morgan from 'morgan';
import config from 'config';
import errorHandler from './middlewares/error-handler';
import notFound from './middlewares/not-found';

const server = express();
server.use(morgan('dev'))
server.use(express.json())
server.use('/products', productsRouter)

server.use(notFound)
server.use(errorHandler)
server.listen(config.get<number>('app.port'), () => {
    console.log(`server listening on http://localhost:${config.get<number>('app.port')}`)
})