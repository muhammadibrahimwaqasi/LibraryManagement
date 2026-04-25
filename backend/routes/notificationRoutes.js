const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');

router.get('/', NotificationController.getAll);
router.get('/user/:userId', NotificationController.getByUser);
router.post('/', NotificationController.create);
router.put('/:id/read', NotificationController.markAsRead);
router.delete('/:id', NotificationController.delete);

module.exports = router;