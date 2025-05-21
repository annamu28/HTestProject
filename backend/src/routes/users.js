const { Type } = require('@sinclair/typebox')
const {
  UserSchema,
  UserWithSectorsSchema,
  CreateUserRequestSchema,
  ErrorSchema
} = require('../schemas')
const userController = require('../controllers/user.controller')

async function usersRoutes(fastify, options) {
  // Create a new user
  fastify.post('/api/users', {
    schema: {
      body: CreateUserRequestSchema,
      response: {
        201: UserWithSectorsSchema,
        400: ErrorSchema
      }
    }
  }, userController.createUser)

  // Get user by ID
  fastify.get('/api/users/:id', {
    schema: {
      params: Type.Object({
        id: Type.Number()
      }),
      response: {
        200: UserWithSectorsSchema,
        404: ErrorSchema
      }
    }
  }, userController.getUserById)

  // Update user
  fastify.put('/api/users/:id', {
    schema: {
      params: Type.Object({
        id: Type.Number()
      }),
      body: CreateUserRequestSchema,
      response: {
        200: UserWithSectorsSchema,
        400: ErrorSchema,
        404: ErrorSchema
      }
    }
  }, userController.updateUser)
}

module.exports = usersRoutes 