const { Type } = require('@fastify/type-provider-typebox')

const SectorSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  value: Type.Number(),
  level: Type.Number(),
  parent_value: Type.Union([Type.Number(), Type.Null()])
})

const UserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  agreed_to_terms: Type.Boolean()
})

const UserWithSectorsSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  agreed_to_terms: Type.Boolean(),
  sectors: Type.Array(SectorSchema)
})

const CreateUserRequestSchema = Type.Object({
  name: Type.String(),
  sectors: Type.Array(Type.String()),
  agreed_to_terms: Type.Boolean()
})

const ErrorSchema = Type.Object({
  error: Type.String()
})

module.exports = {
  SectorSchema,
  UserSchema,
  UserWithSectorsSchema,
  CreateUserRequestSchema,
  ErrorSchema
} 