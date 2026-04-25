const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');

router.get('/', BookController.getAll);
router.get('/search', BookController.search);
router.get('/:id', BookController.getById);
router.post('/', BookController.create);
router.put('/:id', BookController.update);
router.delete('/:id', BookController.delete);

module.exports = router;