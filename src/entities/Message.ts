interface MessageInterface {
  data: string
}

class Message {

  id: number
  content: string

  constructor({ data }: MessageInterface) {
    this.id = Math.floor(Math.random() * 100) + Date.now()
    this.content = data
  }

  isValid() {
    const propertyNames = Object.getOwnPropertyNames(this)
    const amountInvalid = propertyNames
      .map((property) => (!!this[property as keyof Message]) ? null : `${property} is missing`)
      .filter(item => !!item)

    return {
      valid: amountInvalid.length === 0,
      error: amountInvalid
    }
  }
}

export default Message