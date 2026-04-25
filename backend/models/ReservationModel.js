const pool = require('../db');

class ReservationModel {
  static async getAll() {
    const result = await pool.query(`
      SELECT r.*, u.name as user_name, b.title as book_title 
      FROM reservations r 
      LEFT JOIN users u ON r.user_id = u.id 
      LEFT JOIN books b ON r.book_id = b.id 
      ORDER BY r.id DESC
    `);
    return result.rows;
  }

  static async create(userId, bookId) {
    const result = await pool.query(
      'INSERT INTO reservations (user_id, book_id) VALUES ($1, $2) RETURNING *',
      [userId, bookId]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM reservations WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = ReservationModel;