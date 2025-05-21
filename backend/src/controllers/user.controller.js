const userService = require('../services/user.service')
const { ValidationError, NotFoundError, DatabaseError } = require('../errors')

class UserController {
  async createUser(request, reply) {

    try {
      const { name, sectors, agreed_to_terms } = request.body

      const user = await userService.createUser(name, sectors, agreed_to_terms)
      
      reply.code(201)
      return user
    } catch (error) {
      
      // HTTP error handling
      if (error instanceof ValidationError) {
        reply.code(400)
        return { error: error.message }
      }
      if (error instanceof NotFoundError) {
        reply.code(404)
        return { error: error.message }
      }
      if (error instanceof DatabaseError) {
        reply.code(500)
        return { error: 'Internal server error' }
      }
      
      // Unknown errors
      reply.code(500)
      return { error: 'Internal server error' }
    }
  }

  async getUserById(request, reply) {
    try {
      const { id } = request.params
      const user = await userService.getUserWithSectors(id)
      
      if (!user) {
        reply.code(404)
        return { error: 'User not found' }
      }

      return user
    } catch (error) {
      console.error('Error in getUserById:', error)
      
      if (error instanceof ValidationError) {
        reply.code(400)
        return { error: error.message }
      }
      if (error instanceof NotFoundError) {
        reply.code(404)
        return { error: error.message }
      }
      if (error instanceof DatabaseError) {
        reply.code(500)
        return { error: 'Internal server error' }
      }
      
      reply.code(500)
      return { error: 'Internal server error' }
    }
  }

  async updateUser(request, reply) {
    try {
      const { id } = request.params
      const { name, sectors, agreed_to_terms } = request.body

      const user = await userService.updateUser(id, name, sectors, agreed_to_terms)
      
      if (!user) {
        reply.code(404)
        return { error: 'User not found' }
      }

      return user
    } catch (error) {
      console.error('Error in updateUser:', error)
      
      if (error instanceof ValidationError) {
        reply.code(400)
        return { error: error.message }
      }
      if (error instanceof NotFoundError) {
        reply.code(404)
        return { error: error.message }
      }
      if (error instanceof DatabaseError) {
        reply.code(500)
        return { error: 'Internal server error' }
      }
      
      reply.code(500)
      return { error: 'Internal server error' }
    }
  }
}

module.exports = new UserController() 