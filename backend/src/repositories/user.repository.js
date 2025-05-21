const { db } = require('../db')

class UserRepository {
  async create({ name, sectors, agreed_to_terms }) {
    try {
      await db.query('BEGIN')

      // Create user
      const userResult = await db.query(
        'INSERT INTO users (name, agreed_to_terms) VALUES ($1, $2) RETURNING *',
        [name, agreed_to_terms]
      )
      const user = userResult.rows[0]

      // Get sector IDs from values
      const sectorValues = sectors.map(value => parseInt(value, 10))
      
      const sectorIdsResult = await db.query(
        'SELECT id FROM sectors WHERE value = ANY($1::integer[])',
        [sectorValues]
      )

      if (sectorIdsResult.rows.length !== sectorValues.length) {
        throw new Error('One or more sector values do not exist')
      }

      // Add user sectors
      for (const sector of sectorIdsResult.rows) {
        await db.query(
          'INSERT INTO user_sectors (user_id, sector_id) VALUES ($1, $2)',
          [user.id, sector.id]
        )
      }

      await db.query('COMMIT')
      const completeUser = await this.findById(user.id)
      return completeUser
    } catch (error) {
      await db.query('ROLLBACK')
      throw error
    }
  }

  async findById(id) {
    
    const userResult = await db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )
    
    if (!userResult.rows[0]) {
      return null
    }

    const user = userResult.rows[0]
    
    // Get user sectors
    const sectorsResult = await db.query(
      `SELECT s.* 
       FROM sectors s
       JOIN user_sectors us ON s.id = us.sector_id
       WHERE us.user_id = $1`,
      [id]
    )
    
    user.sectors = sectorsResult.rows
    return user
  }

  async update(id, { name, sectors, agreed_to_terms }) {
    try {
      await db.query('BEGIN')

      // Update user
      const userResult = await db.query(
        'UPDATE users SET name = $1, agreed_to_terms = $2 WHERE id = $3 RETURNING *',
        [name, agreed_to_terms, id]
      )

      if (!userResult.rows[0]) {
        await db.query('ROLLBACK')
        return null
      }

      // Get sector IDs from values
      const sectorValues = sectors.map(value => parseInt(value, 10))
      
      const sectorIdsResult = await db.query(
        'SELECT id FROM sectors WHERE value = ANY($1::integer[])',
        [sectorValues]
      )

      if (sectorIdsResult.rows.length !== sectorValues.length) {
        throw new Error('One or more sector values do not exist')
      }

      // Delete existing sectors
      await db.query('DELETE FROM user_sectors WHERE user_id = $1', [id])

      // Add new sectors
      for (const sector of sectorIdsResult.rows) {
        await db.query(
          'INSERT INTO user_sectors (user_id, sector_id) VALUES ($1, $2)',
          [id, sector.id]
        )
      }

      await db.query('COMMIT')
      const completeUser = await this.findById(id)
      return completeUser
    } catch (error) {
      await db.query('ROLLBACK')
      throw error
    }
  }

  async addUserSectors(userId, sectorValues) {
    // First get the sector IDs for the given values
    const sectorIds = await db.query(
      'SELECT id FROM sectors WHERE value = ANY($1::integer[])',
      [sectorValues]
    )

    // Then insert the user-sector relationships
    for (const sector of sectorIds.rows) {
      await db.query(
        'INSERT INTO user_sectors (user_id, sector_id) VALUES ($1, $2)',
        [userId, sector.id]
      )
    }
  }

  async getUserWithSectors(userId) {
    const userResult = await db.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    )

    if (userResult.rows.length === 0) {
      return null
    }

    const user = userResult.rows[0]

    const sectorsResult = await db.query(
      'SELECT s.* FROM sectors s JOIN user_sectors us ON s.id = us.sector_id WHERE us.user_id = $1',
      [userId]
    )

    return {
      ...user,
      sectors: sectorsResult.rows
    }
  }
}

module.exports = new UserRepository() 