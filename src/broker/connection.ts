import { Kafka } from 'kafkajs'
import { INITIAL_RETRY_TIME, RETRIES, BROKERS, CLIENT_ID } from '../constants'

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  retry: {
    initialRetryTime: INITIAL_RETRY_TIME,
    retries: RETRIES
  }
})

export default kafka