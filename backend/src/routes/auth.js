const express = require('express');
const { body } = require('express-validator');
const { 
  register, 
  login, 
  getMe, 
  verifyToken 
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// 회원가입 유효성 검사 (dateOfBirth 제거)
const registerValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('First name is required'),
  body('lastName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Last name is required'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('phone')
    .optional()
    .isLength({ min: 1 })
    .withMessage('Please provide a valid phone number'),
  body('country')
    .optional()
    .isLength({ min: 1 })
    .withMessage('Country is required')
];

// 로그인 유효성 검사
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// 라우트 정의
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', authenticate, getMe);
router.get('/verify-token', authenticate, verifyToken);

module.exports = router;
