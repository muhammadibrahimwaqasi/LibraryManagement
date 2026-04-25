const FineModel = require('../models/FineModel');

class FineController {
  static async getAll(req, res) {
    try {
      const fines = await FineModel.getAll();
      res.json(fines);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByUser(req, res) {
    try {
      const { userId } = req.params;
      const fines = await FineModel.getByUser(userId);
      res.json(fines);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { userId, amount } = req.body;
      if (!userId || !amount) {
        return res.status(400).json({ error: 'User ID and amount required' });
      }
      const fine = await FineModel.create(userId, amount);
      res.status(201).json(fine);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const fine = await FineModel.delete(req.params.id);
      if (!fine) {
        return res.status(404).json({ error: 'Fine not found' });
      }
      res.json({ message: 'Fine deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = FineController;