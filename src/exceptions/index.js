const { DEFAULT_HEADER } = require('../constants/index')

const handleError = response => {
  return error => {
    console.error("Deu Ruim", error)
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({ error: 'Internal Server Error' }))
    return response.end()
  }
}

module.exports = { handleError }