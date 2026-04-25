const ReservationModel = require('../models/ReservationModel');

class ReservationController {
  static async getAll(req, res) {
    try {
      const reservations = await ReservationModel.getAll();
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { userId, bookId } = req.body;
      if (!userId || !bookId) {
        return res.status(400).json({ error: 'User ID and Book ID are required' });
      }
      const reservation = await ReservationModel.create(userId, bookId);
      res.status(201).json(reservation);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const reservation = await ReservationModel.updateStatus(req.params.id, status);
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
      res.json(reservation);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const reservation = await ReservationModel.delete(req.params.id);
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
      res.json({ message: 'Reservation deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ReservationController;