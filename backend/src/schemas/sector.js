const { Type } = require('@fastify/type-provider-typebox')

// Base sector schema
const SectorSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  value: Type.String(),
  level: Type.Number(),
  parent_value: Type.Union([Type.String(), Type.Null()])
})

// Response schemas
const GetSectorsResponseSchema = Type.Array(SectorSchema)

// Request schemas
const CreateSectorRequestSchema = Type.Object({
  name: Type.String(),
  value: Type.String(),
  level: Type.Number(),
  parent_value: Type.Union([Type.String(), Type.Null()])
})

// Route schemas
const GetSectorsRouteSchema = {
  response: {
    200: GetSectorsResponseSchema
  }
}

const CreateSectorRouteSchema = {
  body: CreateSectorRequestSchema,
  response: {
    200: SectorSchema
  }
}

module.exports = {
  SectorSchema,
  GetSectorsResponseSchema,
  CreateSectorRequestSchema,
  GetSectorsRouteSchema,
  CreateSectorRouteSchema
} 