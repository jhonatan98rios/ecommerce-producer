import { createServer } from 'http';
import { DEFAULT_HEADER, PORT } from './constants/index'

import { routes, RoutesInterface } from './routes'

const handleError = (response: any) => {
  return (error: any) => {
    console.error("Deu Ruim", error)
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({ error: 'Internal Server Error' }))
    return response.end()
  }
}

const handler = (request: any, response: any) => {
  const { url, method } = request
  const [,route, id] = url.split('/')

  request.queryString = { id: isNaN(id) ? id : Number(id) }
  const key = `/${route}:${method.toLowerCase()}`

  response.writeHead(200, DEFAULT_HEADER)
  const chosen = routes[key as keyof RoutesInterface] || routes.default

  return chosen(request, response).catch(handleError(response))
}

createServer(handler).listen(PORT, () => console.log('Server running at', PORT))