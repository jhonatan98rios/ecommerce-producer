const MessageRepository = require('../repositories/MessageRepository')
const MessageService = require('../services/MessageService')
const brokerConnection = require('../broker/connection')


const generateInstance = () => {
    const messageRepository = new MessageRepository({
        broker: brokerConnection
    })

    const messageService = new MessageService({
        messageRepository
    })

    return messageService
}

module.exports = { generateInstance }