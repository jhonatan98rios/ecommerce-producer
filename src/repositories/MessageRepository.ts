import { Kafka, Producer } from 'kafkajs'
import { TOPIC_NAME } from '../constants'
import Message from '../entities/Message'

interface MessageRepositoryInterface {
    broker: Kafka
}

class MessageRepository {
    producer: Producer

    constructor ({ broker }: MessageRepositoryInterface) {
        this.producer = broker.producer()
    }

    async publisher(data: Message) {
        await this.producer.connect()

        await this.producer.send({
            topic: TOPIC_NAME,
            messages: [{ 
                value: JSON.stringify(data)
            }]
        })
        await this.producer.disconnect()
    }
}

export default MessageRepository
