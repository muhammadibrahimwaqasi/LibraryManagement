const IssueModel = require('../models/IssueModel');

class IssueController {
  static async getAll(req, res) {
    try {
      const issues = await IssueModel.getAll();
      res.json(issues);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getActive(req, res) {
    try {
      const issues = await IssueModel.getActive();
      res.json(issues);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async issueBook(req, res) {
    try {
      const { userId, bookId } = req.body;
      if (!userId || !bookId) {
        return res.status(400).json({ error: 'User ID and Book ID are required' });
      }
      const issue = await IssueModel.issueBook(userId, bookId);
      res.status(201).json(issue);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async returnBook(req, res) {
    try {
      const { issueId, lateFee } = req.body;
      if (!issueId) {
        return res.status(400).json({ error: 'Issue ID is required' });
      }
      const fine = await IssueModel.calculateFine(req.body.issueId);
      const result = await IssueModel.returnBook(issueId, lateFee || fine);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async calculateFine(req, res) {
    try {
      const { issueId } = req.params;
      const fine = await IssueModel.calculateFine(issueId);
      res.json({ fine });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = IssueController;