const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');

router.get('/', ReservationController.getAll);
router.post('/', ReservationController.create);
router.put('/:id', ReservationController.updateStatus);
router.delete('/:id', ReservationController.delete);

module.exports = router;