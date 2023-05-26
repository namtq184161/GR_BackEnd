const express = require('express');
const {
  register,
  activateAccount,
  login,
  sendVerification,
} = require('../controllers/user');
const { authUser } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/activate', authUser, activateAccount);
router.post('/login', login);
router.post('/sendVerification', authUser, sendVerification);

module.exports = router;
