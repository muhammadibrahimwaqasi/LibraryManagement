const express = require('express');
const router = express.Router();
const LibrarianController = require('../controllers/librarianController');

router.get('/', LibrarianController.getAll);
router.get('/:id', LibrarianController.getById);
router.post('/', LibrarianController.create);
router.put('/:id', LibrarianController.update);
router.delete('/:id', LibrarianController.delete);

module.exports = router;