import * as path from 'path'

import cors from 'cors'
import express from 'express'

import { handleRequest } from './src/main.server'

const port = process.env['PORT'] || 4200
const app = express()

const browserDist = path.join(process.cwd(), 'dist/apps/my-app/browser')
const indexPath = path.join(browserDist, 'index.html')

app.use(cors())

app.get(
  '*.*',
  express.static(browserDist, {
    maxAge: '1y',
  }),
)

app.use('*', handleRequest(indexPath))

const server = app.listen(port, () => {
  // Server has started
})

server.on('error', console.error)
