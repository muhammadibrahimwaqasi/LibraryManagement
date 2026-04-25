const pool = require('../db');

class BookModel {
  static async getAll() {
    const result = await pool.query(`
      SELECT b.*, a.name as author_name, c.name as category_name 
      FROM books b 
      LEFT JOIN authors a ON b.author_id = a.id 
      LEFT JOIN categories c ON b.category_id = c.id 
      ORDER BY b.id DESC
    `);
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(`
      SELECT b.*, a.name as author_name, c.name as category_name 
      FROM books b 
      LEFT JOIN authors a ON b.author_id = a.id 
      LEFT JOIN categories c ON b.category_id = c.id 
      WHERE b.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async create(title, authorId, categoryId, quantity) {
    const result = await pool.query(
      'INSERT INTO books (title, author_id, category_id, quantity, available) VALUES ($1, $2, $3, $4, $4) RETURNING *',
      [title, authorId, categoryId, quantity]
    );
    return result.rows[0];
  }

  static async update(id, title, authorId, categoryId, quantity) {
    const result = await pool.query(
      'UPDATE books SET title = $1, author_id = $2, category_id = $3, quantity = $4, available = $4 WHERE id = $5 RETURNING *',
      [title, authorId, categoryId, quantity, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async search(searchTerm) {
    const result = await pool.query(`
      SELECT b.*, a.name as author_name, c.name as category_name 
      FROM books b 
      LEFT JOIN authors a ON b.author_id = a.id 
      LEFT JOIN categories c ON b.category_id = c.id 
      WHERE b.title ILIKE $1 OR c.name ILIKE $1
    `, [`%${searchTerm}%`]);
    return result.rows;
  }

  static async decreaseAvailability(id) {
    const result = await pool.query(
      'UPDATE books SET available = available - 1 WHERE id = $1 AND available > 0 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async increaseAvailability(id) {
    const result = await pool.query(
      'UPDATE books SET available = available + 1 WHERE id = $1 AND available < quantity RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = BookModel;