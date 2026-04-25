const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/authorController');

router.get('/', AuthorController.getAll);
router.get('/:id', AuthorController.getById);
router.post('/', AuthorController.create);
router.put('/:id', AuthorController.update);
router.delete('/:id', AuthorController.delete);

module.exports = router;