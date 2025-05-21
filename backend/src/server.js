const fastify = require('fastify')({
  logger: true
})
const { TypeBoxTypeProvider } = require('@fastify/type-provider-typebox')
const { Type } = require('@fastify/type-provider-typebox')
const cors = require('@fastify/cors')
const { db } = require('./db')
const sectorsRoutes = require('./routes/sectors')
const usersRoutes = require('./routes/users')

// Register plugins
fastify.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

// Register TypeBox provider
fastify.withTypeProvider(TypeBoxTypeProvider)

// Register routes
fastify.register(sectorsRoutes)
fastify.register(usersRoutes)

// Health check endpoint
fastify.get('/health', {
  schema: {
    tags: ['Health'],
    summary: 'Health check endpoint',
    description: 'Check if the API is running',
    response: {
      200: Type.Object({
        status: Type.String()
      })
    }
  }
}, async (request, reply) => {
  return { status: 'ok' }
})

// Start server
const start = async () => {
  try {
    await fastify.listen({ 
      port: 3001,
      host: '0.0.0.0'  // Listen on all available network interfaces
    })
    console.log('Server is running on http://localhost:3001')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start() 