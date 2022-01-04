const { TOPIC_NAME } = require('../constants')

class MessageRepository {
    constructor ({ broker }) {
        this.producer = broker.producer()
    }

    async publisher(data) {

        console.log('data')
        console.log(data)

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

module.exports = MessageRepository
