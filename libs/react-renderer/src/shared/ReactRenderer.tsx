import * as fs from 'fs'
import * as path from 'path'

import { PipelineRegistryStoreType } from '@ts-pipeline/core'
import { AppRender } from '@ts-pipeline/renderer/core'
import { Unsubscriber } from '@ts-pipeline/ts-core'
import cors from 'cors'
import express from 'express'
import type { Request, Response } from 'express'
import isbot from 'isbot'
import React from 'react'
import * as ReactDOMServer from 'react-dom/server'

import { App } from './App'

export class ReactRenderer implements AppRender {
  port = process.env['PORT'] || 4201

  browserDist = path.join(process.cwd(), 'dist/libs/react-renderer')
  indexPath = path.join(this.browserDist, 'index.html')

  render(registry: PipelineRegistryStoreType): Unsubscriber {
    const app = express()
    app.use(cors())
    app.get(
      '*.*',
      express.static(this.browserDist, {
        maxAge: '1y',
      }),
    )

    app.use('*', handleRequest(this.indexPath, registry))

    const server = app.listen(this.port, () => {
      // Server has started
    })

    console.info('Server started ', server.address())

    server.on('error', console.error)

    return () => {
      app.removeAllListeners()
      server.close()
    }
  }
}

let indexHtml: null | string = null

function handleRequest(indexPath: string, registry: PipelineRegistryStoreType) {
  return function render(req: Request, res: Response) {
    let didError = false

    if (!indexHtml) {
      indexHtml = fs.readFileSync(indexPath).toString()
    }

    const [htmlStart, htmlEnd] = indexHtml.split(`<div id="root"></div>`)

    // For bots (e.g. search engines), the content will not be streamed but render all at once.
    // For users, content should be streamed to the user as they are ready.
    const callbackName = isbot(req.headers['user-agent']) ? 'onAllReady' : 'onShellReady'

    const stream = ReactDOMServer.renderToPipeableStream(<App registry={registry} />, {
      [callbackName]() {
        res.statusCode = didError ? 500 : 200
        res.setHeader('Content-type', 'text/html; charset=utf-8')
        res.write(`${htmlStart}<div id="root">`)
        stream.pipe(res)
        res.write(`</div>${htmlEnd}`)
      },
      onShellError(error) {
        console.error(error)
        res.statusCode = 500
        res.send('<!doctype html><h1>Server Error</h1>')
      },
      onError(error) {
        didError = true
        console.error(error)
      },
    })
  }
}
