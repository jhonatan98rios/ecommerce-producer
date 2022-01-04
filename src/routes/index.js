const Message = require('../entities/Message')
const messageFactory = require('../factories/MessageFactory')
const messageService = messageFactory.generateInstance()
const { DEFAULT_HEADER } = require('../constants')
const { handleError } = require('../exceptions')

const routes = {

  '/message:get': async (request, response) => {
    const { id } = request.queryString

    response.write(
      JSON.stringify({ result: id })
    )

    response.end()
  },




  '/message:post': async (request, response) => {
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



  default: (request, response) => {
    response.write("Erro ao se conectar")
    response.end()
  }
}

module.exports = routes