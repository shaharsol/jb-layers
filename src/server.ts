import path from 'path'
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, 'config')
import config from 'config'
import server from './app'

server.listen(config.get<number>('app.port'), () => {
    console.log(`server listening on http://localhost:${config.get<number>('app.port')}`)
})
