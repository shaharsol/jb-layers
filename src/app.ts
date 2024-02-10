// import path from 'path';
// console.log(__dirname)
// console.log(path.resolve('./'))
// console.log(process.env.NODE_ENV)
// npm init @eslint/config
// lint all : npx eslint . --fix --ext .ts
import express from 'express'
import productsRouter from './routes/products'
import categoriesRouter from './routes/categories'
import authRouter from './routes/auth'
import morgan from 'morgan'
import errorHandler from './middlewares/error-handler'
import notFound from './middlewares/not-found'

const server = express()
server.use(morgan('dev'))
server.use(express.json())
server.use('/auth', authRouter)
server.use('/api/products', productsRouter)
server.use('/api/categories', categoriesRouter)

server.use(notFound)
server.use(errorHandler)

export default server
