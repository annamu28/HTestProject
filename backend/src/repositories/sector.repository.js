const { db } = require('../db')

class SectorRepository {
  async findAll() {
    const result = await db.query(`
      SELECT id, name, value, level, parent_value
      FROM sectors
      ORDER BY level, name
    `)
    return result.rows
  }

  async findById(id) {
    const result = await db.query(
      'SELECT * FROM sectors WHERE id = $1',
      [id]
    )
    return result.rows[0]
  }

  async findByValue(value) {
    const result = await db.query(
      'SELECT * FROM sectors WHERE value = $1',
      [value]
    )
    return result.rows[0]
  }
}

module.exports = new SectorRepository() 