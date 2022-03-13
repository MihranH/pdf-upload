
const router = require('express').Router();

router.use('/api/upload', require('./upload'));
router.use('/api/event', require('./event'));

module.exports = router;
