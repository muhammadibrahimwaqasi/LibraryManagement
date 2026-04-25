const pool = require('../db');

class FineModel {
  static async getAll() {
    const result = await pool.query(`
      SELECT f.*, u.name as user_name 
      FROM fines f 
      LEFT JOIN users u ON f.user_id = u.id 
      ORDER BY f.id DESC
    `);
    return result.rows;
  }

  static async getByUser(userId) {
    const result = await pool.query(
      'SELECT * FROM fines WHERE user_id = $1 ORDER BY id DESC',
      [userId]
    );
    return result.rows;
  }

  static async create(userId, amount) {
    const result = await pool.query(
      'INSERT INTO fines (user_id, amount) VALUES ($1, $2) RETURNING *',
      [userId, amount]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM fines WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = FineModel;