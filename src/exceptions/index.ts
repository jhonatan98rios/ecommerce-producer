import { ServerResponse } from 'http';
import { DEFAULT_HEADER } from '../constants/index'

const handleError = (response: ServerResponse) => {
  return (error: unknown) => {
    console.error("Deu Ruim", error)
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({ error: 'Internal Server Error' }))
    return response.end()
  }
}

export default handleError