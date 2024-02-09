// import path from 'path';
// console.log(__dirname)
// console.log(path.resolve('./'))
// console.log(process.env.NODE_ENV)
// lint all : npx eslint . --fix --ext .ts
import express from 'express'
import productsRouter from './routes/products'
import categoriesRouter from './routes/categories'
import authRouter from './routes/auth'
import morgan from 'morgan'
import errorHandler from './middlewares/error-handler'
import notFound from './middlewares/not-found'
import path from 'path'
// process.env['NODE_CONFIG_DIR'] = __dirname + "/config/"

const server = express()
server.use(morgan('dev'))
server.use(express.json())
server.use('/auth', authRouter)
server.use('/api/products', productsRouter)
server.use('/api/categories', categoriesRouter)

server.use(notFound)
server.use(errorHandler)

export default server
