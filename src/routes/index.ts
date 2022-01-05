import { IncomingMessage, ServerResponse } from 'http';

import { DEFAULT_HEADER } from '../constants'

import Message from '../entities/Message'
import messageFactory from '../factories/MessageFactory'
const messageService = messageFactory.generateInstance()
import handleError from '../exceptions'


interface RoutesInterface {
  '/message:get': () => Promise<ServerResponse>
  '/message:post': () => Promise<ServerResponse>
}


const routes = {

  '/message:get': async (request: IncomingMessage, response: ServerResponse) => {

    response.write(
      JSON.stringify({ result: "Hello World" })
    )

    return response.end()
  },


  '/message:post': async (request: IncomingMessage, response: ServerResponse) => {
    for await (const data of request) {

      try {

        const item = JSON.parse(data)
        const message = new Message(item)
        const { valid, error } = message.isValid()

        if (!valid) {
          response.writeHead(400, DEFAULT_HEADER)
          response.write(
            JSON.stringify({ error: error.join(',')})
          )
        }

        const id = await messageService.create(message)
        response.writeHead(201, DEFAULT_HEADER)
        response.write(JSON.stringify({ success: 'Message delivered with success!!', id }))

        return response.end()

      } catch (error) {

        return handleError(response)(error)
      }
    }
  },

  default: (request: IncomingMessage, response: ServerResponse) => {
    response.write("Erro ao se conectar")
    return response.end()
  }
}

export {routes, RoutesInterface}