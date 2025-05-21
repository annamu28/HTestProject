const { Type } = require('@fastify/type-provider-typebox')

// Base user schema
const UserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  agreed_to_terms: Type.Boolean()
})

// Extended user schema with sectors
const UserWithSectorsSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  agreed_to_terms: Type.Boolean(),
  sectors: Type.Array(Type.Object({
    id: Type.Number(),
    name: Type.String(),
    value: Type.String(),
    level: Type.Number(),
    parent_value: Type.Union([Type.String(), Type.Null()])
  }))
})

// Request schemas
const CreateUserRequestSchema = Type.Object({
  name: Type.String(),
  sectors: Type.Array(Type.String()),
  agreed_to_terms: Type.Boolean()
})

// Response schemas
const CreateUserResponseSchema = UserSchema
const GetUserResponseSchema = UserWithSectorsSchema

// Route schemas
const CreateUserRouteSchema = {
  body: CreateUserRequestSchema,
  response: {
    200: CreateUserResponseSchema
  }
}

const GetUserRouteSchema = {
  response: {
    200: GetUserResponseSchema,
    404: Type.Object({
      error: Type.String()
    })
  }
}

module.exports = {
  UserSchema,
  UserWithSectorsSchema,
  CreateUserRequestSchema,
  CreateUserResponseSchema,
  GetUserResponseSchema,
  CreateUserRouteSchema,
  GetUserRouteSchema
} 