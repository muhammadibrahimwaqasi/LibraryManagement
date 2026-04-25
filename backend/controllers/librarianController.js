const LibrarianModel = require('../models/LibrarianModel');

class LibrarianController {
  static async getAll(req, res) {
    try {
      const librarians = await LibrarianModel.getAll();
      res.json(librarians);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const librarian = await LibrarianModel.getById(req.params.id);
      if (!librarian) {
        return res.status(404).json({ error: 'Librarian not found' });
      }
      res.json(librarian);
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
      const librarian = await LibrarianModel.create(name);
      res.status(201).json(librarian);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { name } = req.body;
      const librarian = await LibrarianModel.update(req.params.id, name);
      if (!librarian) {
        return res.status(404).json({ error: 'Librarian not found' });
      }
      res.json(librarian);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const librarian = await LibrarianModel.delete(req.params.id);
      if (!librarian) {
        return res.status(404).json({ error: 'Librarian not found' });
      }
      res.json({ message: 'Librarian deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = LibrarianController;