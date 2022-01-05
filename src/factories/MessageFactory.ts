import MessageRepository from '../repositories/MessageRepository'
import MessageService from '../services/MessageService'
import brokerConnection from '../broker/connection'


const generateInstance = () => {
    const messageRepository = new MessageRepository({ 
        broker: brokerConnection
    })

    return new MessageService({ 
        messageRepository 
    })
}

export default { generateInstance }