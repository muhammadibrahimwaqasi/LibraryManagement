const pool = require('../db');

class IssueModel {
  static async getAll() {
    const result = await pool.query(`
      SELECT i.*, u.name as user_name, b.title as book_title 
      FROM issued_books i 
      LEFT JOIN users u ON i.user_id = u.id 
      LEFT JOIN books b ON i.book_id = b.id 
      ORDER BY i.id DESC
    `);
    return result.rows;
  }

  static async getActive() {
    const result = await pool.query(`
      SELECT i.*, u.name as user_name, b.title as book_title 
      FROM issued_books i 
      LEFT JOIN users u ON i.user_id = u.id 
      LEFT JOIN books b ON i.book_id = b.id 
      WHERE i.return_date IS NULL
      ORDER BY i.id DESC
    `);
    return result.rows;
  }

  static async issueBook(userId, bookId) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const bookCheck = await client.query(
        'SELECT * FROM books WHERE id = $1 AND available > 0',
        [bookId]
      );
      
      if (bookCheck.rows.length === 0) {
        throw new Error('Book not available');
      }
      
      const issueResult = await client.query(
        'INSERT INTO issued_books (user_id, book_id, issue_date) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *',
        [userId, bookId]
      );
      
      await client.query(
        'UPDATE books SET available = available - 1 WHERE id = $1',
        [bookId]
      );
      
      await client.query('COMMIT');
      return issueResult.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async returnBook(issueId, lateFee = 0) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const issueResult = await client.query(
        'SELECT * FROM issued_books WHERE id = $1 AND return_date IS NULL',
        [issueId]
      );
      
      if (issueResult.rows.length === 0) {
        throw new Error('No active issue found');
      }
      
      const issue = issueResult.rows[0];
      const dueDate = new Date(issue.issue_date);
      dueDate.setDate(dueDate.getDate() + 14);
      const now = new Date();
      
      await client.query(
        'UPDATE issued_books SET return_date = CURRENT_TIMESTAMP WHERE id = $1',
        [issueId]
      );
      
      await client.query(
        'INSERT INTO returns (issued_id) VALUES ($1)',
        [issueId]
      );
      
      await client.query(
        'UPDATE books SET available = available + 1 WHERE id = $1',
        [issue.book_id]
      );
      
      if (lateFee > 0) {
        await client.query(
          'INSERT INTO fines (user_id, amount) VALUES ($1, $2)',
          [issue.user_id, lateFee]
        );
      }
      
      await client.query('COMMIT');
      return { message: 'Book returned successfully' };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async calculateFine(issueId) {
    const result = await pool.query(
      'SELECT * FROM issued_books WHERE id = $1',
      [issueId]
    );
    
    if (result.rows.length === 0) return 0;
    
    const issue = result.rows[0];
    const issueDate = new Date(issue.issue_date);
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 14);
    const now = new Date();
    
    if (now > dueDate) {
      const daysLate = Math.floor((now - dueDate) / (1000 * 60 * 60 * 24));
      return daysLate * 1.00;
    }
    return 0;
  }
}

module.exports = IssueModel;