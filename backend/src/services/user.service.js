const userRepository = require('../repositories/user.repository')
const { db } = require('../db')
const { ValidationError, NotFoundError, DatabaseError } = require('../errors')

class UserService {
  async createUser(name, sectors, agreed_to_terms) {
    try {
      // Validate input
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new ValidationError('Name is required and must be a non-empty string')
      }

      if (!Array.isArray(sectors) || sectors.length === 0) {
        throw new ValidationError('At least one sector must be selected')
      }

      if (typeof agreed_to_terms !== 'boolean' || !agreed_to_terms) {
        throw new ValidationError('You must agree to the terms')
      }

      // Create user
      const user = await userRepository.create({
        name,
        sectors,
        agreed_to_terms
      })

      if (!user) {
        throw new DatabaseError('Failed to create user')
      }

      // Ensure we have the complete user data with sectors
      const completeUser = await userRepository.findById(user.id)
      if (!completeUser) {
        throw new DatabaseError('Failed to fetch created user data')
      }

      return completeUser
    } catch (error) {
      if (error instanceof ValidationError || error instanceof DatabaseError) {
        throw error
      }
      throw new DatabaseError('Failed to create user: ' + error.message)
    }
  }

  async getUserWithSectors(userId) {
    try {
      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      const user = await userRepository.findById(userId)
      
      if (!user) {
        throw new NotFoundError('User not found')
      }

      return user
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error
      }
      throw new DatabaseError('Failed to fetch user: ' + error.message)
    }
  }

  async updateUser(id, name, sectors, agreed_to_terms) {
    try {
      // Validate input
      if (!id) {
        throw new ValidationError('User ID is required')
      }

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new ValidationError('Name is required and must be a non-empty string')
      }

      if (!Array.isArray(sectors) || sectors.length === 0) {
        throw new ValidationError('At least one sector must be selected')
      }

      if (typeof agreed_to_terms !== 'boolean' || !agreed_to_terms) {
        throw new ValidationError('You must agree to the terms')
      }

      // Check if user exists
      const existingUser = await userRepository.findById(id)
      if (!existingUser) {
        throw new NotFoundError('User not found')
      }

      // Update user
      const updatedUser = await userRepository.update(id, {
        name,
        sectors,
        agreed_to_terms
      })

      if (!updatedUser) {
        throw new DatabaseError('Failed to update user')
      }

      return updatedUser
    } catch (error) {
      if (error instanceof ValidationError || 
          error instanceof NotFoundError || 
          error instanceof DatabaseError) {
        throw error
      }
      throw new DatabaseError('Failed to update user: ' + error.message)
    }
  }
}

module.exports = new UserService() 