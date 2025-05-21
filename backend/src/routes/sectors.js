const { Type } = require('@sinclair/typebox')
const { SectorSchema } = require('../schemas')
const sectorController = require('../controllers/sector.controller')

async function sectorsRoutes(fastify, options) {
  // Get all sectors
  fastify.get('/api/sectors', {
    schema: {
      response: {
        200: Type.Array(SectorSchema)
      }
    }
  }, sectorController.getAllSectors)
}

module.exports = sectorsRoutes 