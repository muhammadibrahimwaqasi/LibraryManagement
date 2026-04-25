const pool = require('../db');

class NotificationModel {
  static async getAll() {
    const result = await pool.query('SELECT * FROM notifications ORDER BY id DESC');
    return result.rows;
  }

  static async getByUser(userId) {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY id DESC',
      [userId]
    );
    return result.rows;
  }

  static async create(message, userId = null) {
    const result = await pool.query(
      'INSERT INTO notifications (message, user_id) VALUES ($1, $2) RETURNING *',
      [message, userId]
    );
    return result.rows[0];
  }

  static async markAsRead(id) {
    return { message: 'Notification marked as read' };
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM notifications WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = NotificationModel;