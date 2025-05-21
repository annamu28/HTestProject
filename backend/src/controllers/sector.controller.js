const sectorService = require('../services/sector.service')

async function getAllSectors(request, reply) {
  try {
    const sectors = await sectorService.getAllSectors()
    return sectors
  } catch (error) {
    request.log.error(error)
    reply.code(500)
    return { error: 'Internal server error' }
  }
}

module.exports = {
  getAllSectors
} 