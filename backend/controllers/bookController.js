const BookModel = require('../models/BookModel');

class BookController {
  static async getAll(req, res) {
    try {
      const books = await BookModel.getAll();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const book = await BookModel.getById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { title, authorId, categoryId, quantity } = req.body;
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }
      const book = await BookModel.create(title, authorId, categoryId, quantity || 1);
      res.status(201).json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { title, authorId, categoryId, quantity } = req.body;
      const book = await BookModel.update(req.params.id, title, authorId, categoryId, quantity);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const book = await BookModel.delete(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async search(req, res) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }
      const books = await BookModel.search(q);
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = BookController;