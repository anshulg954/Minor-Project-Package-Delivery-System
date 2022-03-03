const express = require('express');

const {body} = require('express-validator');

const router = express.Router();

const User = require('../models/users');

const authController = require('../controllers/auth');

/* 
Signup Route 
    Requires: name, email, password, contact
    Redirects to the Signup Module of Auth Controller
*/
router.post('/signup', [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Email is required').custom(async (email) => {
        const usersAll = await User.getAllUsers();
        usersAll.forEach(user => {
            if(user.email === email){
                const error = new Error('Email Already Exists!!');
                error.statusCode = 401;
                throw error;
            }
        });
    })
    .normalizeEmail(),
    body('contact').trim().not().isEmpty().withMessage('Contact is required'),
    body('password').trim().isLength({min: 5}).withMessage('Password must be at least 5 characters long')
], authController.signup);

/* 
Login Route
    Requires: email, password
    Redirects to the Login Module of Auth Controller
*/
router.post('/login', [
    body('email').trim().isEmail().withMessage('Email is required'),
    body('password').trim().isLength({min: 5}).withMessage('Password must be at least 5 characters long')
], authController.login);

/* 
Verification Route
    Requires: Contact, OTP (from the User)
    Redirects to the Verify Module of Auth Controller
*/
router.post('/verify', [
    body('contact').trim().not().isEmpty().withMessage('Contact is required'),
    body('otp').trim().not().isEmpty().withMessage('OTP is required'),
    body('email').trim().isEmail().withMessage('Email is required').normalizeEmail()
], authController.verify);

module.exports = router;
