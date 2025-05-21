class BusinessError extends Error {
  constructor(message, code = 'BUSINESS_ERROR') {
    super(message)
    this.name = 'BusinessError'
    this.code = code
  }
}

class ValidationError extends BusinessError {
  constructor(message) {
    super(message, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

class NotFoundError extends BusinessError {
  constructor(message) {
    super(message, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'DatabaseError'
  }
}

module.exports = {
  BusinessError,
  ValidationError,
  NotFoundError,
  DatabaseError
} 