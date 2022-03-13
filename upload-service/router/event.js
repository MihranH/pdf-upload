const router = require('express').Router();
const EventController = require('../controllers/EventController');

router.post('/', (req, res) => EventController.handleEvent(req, res));

module.exports = router;