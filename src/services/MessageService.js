class MessageService {
    constructor ({ messageRepository }) {
        this.messageRepository = messageRepository
    }

    async create(data) {
        return this.messageRepository.publisher(data)
    }
}

module.exports = MessageService