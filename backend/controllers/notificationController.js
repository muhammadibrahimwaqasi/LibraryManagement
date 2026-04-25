const NotificationModel = require('../models/NotificationModel');

class NotificationController {
  static async getAll(req, res) {
    try {
      const notifications = await NotificationModel.getAll();
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getByUser(req, res) {
    try {
      const { userId } = req.params;
      const notifications = await NotificationModel.getByUser(userId);
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { message, userId } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }
      const notification = await NotificationModel.create(message, userId || null);
      res.status(201).json(notification);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async markAsRead(req, res) {
    try {
      const notification = await NotificationModel.markAsRead(req.params.id);
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.json(notification);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const notification = await NotificationModel.delete(req.params.id);
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      res.json({ message: 'Notification deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = NotificationController;