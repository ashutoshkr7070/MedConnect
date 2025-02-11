const express = require('express');
const { loginController, registerController, authController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// router object
const router = express.Router()

// LOGIN || POST
router.post('/login', loginController)

// REGISTER || POST
router.post('/register', registerController)

// AUTH || POST
router.post('/getUserData', authMiddleware, authController);

module.exports = router;