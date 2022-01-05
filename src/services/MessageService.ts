import Message from "../entities/Message"
import MessageRepository from "../repositories/MessageRepository"

interface MessageServiceInterface {
    messageRepository: MessageRepository
}

class MessageService {
    messageRepository: MessageRepository

    constructor ({ messageRepository }: MessageServiceInterface) {
        this.messageRepository = messageRepository
    }

    async create(data: Message) {
        return this.messageRepository.publisher(data)
    }
}

export default MessageService