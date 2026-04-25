const pool = require('../db');

class AuthorModel {
  static async getAll() {
    const result = await pool.query('SELECT * FROM authors ORDER BY name');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(name) {
    const result = await pool.query(
      'INSERT INTO authors (name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  }

  static async update(id, name) {
    const result = await pool.query(
      'UPDATE authors SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = AuthorModel;