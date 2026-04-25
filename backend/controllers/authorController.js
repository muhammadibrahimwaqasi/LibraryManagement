const AuthorModel = require('../models/AuthorModel');

class AuthorController {
  static async getAll(req, res) {
    try {
      const authors = await AuthorModel.getAll();
      res.json(authors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const author = await AuthorModel.getById(req.params.id);
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }
      res.json(author);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      const author = await AuthorModel.create(name);
      res.status(201).json(author);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { name } = req.body;
      const author = await AuthorModel.update(req.params.id, name);
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }
      res.json(author);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const author = await AuthorModel.delete(req.params.id);
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }
      res.json({ message: 'Author deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = AuthorController;