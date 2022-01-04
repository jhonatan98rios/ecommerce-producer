const { Kafka } = require('kafkajs')
const { INITIAL_RETRY_TIME, RETRIES, BROKERS, CLIENT_ID } = require('../constants')

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  retry: {
    initialRetryTime: INITIAL_RETRY_TIME,
    retries: RETRIES
  }
})

module.exports = kafka