const express = require('express');
const router = express.Router();
const FineController = require('../controllers/fineController');

router.get('/', FineController.getAll);
router.get('/user/:userId', FineController.getByUser);
router.post('/', FineController.create);
router.delete('/:id', FineController.delete);

module.exports = router;