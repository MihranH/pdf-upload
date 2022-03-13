const router = require('express').Router();
const AuthController = require('../controllers/AuthController');

router.post('/register', (req, res) => AuthController.register(req, res));
router.post('/login', (req, res) => AuthController.login(req, res));
router.put('/logout', (req, res) => AuthController.logout(req, res));
router.get('/get-me', (req, res) => AuthController.getMe(req, res));

module.exports = router;