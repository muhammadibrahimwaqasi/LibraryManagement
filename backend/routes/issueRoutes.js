const express = require('express');
const router = express.Router();
const IssueController = require('../controllers/issueController');

router.get('/', IssueController.getAll);
router.get('/active', IssueController.getActive);
router.post('/issue', IssueController.issueBook);
router.post('/return', IssueController.returnBook);
router.get('/fine/:issueId', IssueController.calculateFine);

module.exports = router;