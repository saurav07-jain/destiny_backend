const express = require('express');
const { login, getMe } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.get('/me', getMe);

module.exports = router;
