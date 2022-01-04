const http = require('http')
const { DEFAULT_HEADER, PORT } = require('./constants/index')
//const { handleError } = require('./exceptions')

const routes = require('./routes')


const handleError = response => {
  return error => {
    console.error("Deu Ruim", error)
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({ error: 'Internal Server Error' }))
    return response.end()
  }
}


const handler = (request, response) => {
  const { url, method } = request
  const [first, route, id] = url.split('/')
  request.queryString = { id: isNaN(id) ? id : Number(id) }

  const key = `/${route}:${method.toLowerCase()}`

  response.writeHead(200, DEFAULT_HEADER)

  const chosen = routes[key] || routes.default

  return chosen(request, response).catch(handleError(response))
}


http.createServer(handler).listen(PORT, () => {
  console.log('Server running at', PORT)
})