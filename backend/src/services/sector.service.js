const sectorRepository = require('../repositories/sector.repository')
const { DatabaseError } = require('../errors')

class SectorService {
  async getAllSectors() {
    try {
      const sectors = await sectorRepository.findAll()
      return sectors
    } catch (error) {
      throw new DatabaseError('Failed to fetch sectors')
    }
  }
}

module.exports = new SectorService() 