const express = require('express');

const {body} = require('express-validator');

const router = express.Router();

const feedbackController = require('../controllers/feedback');

/* 
Create Feedback Route 
    Requires: orderID, email, name, subject, message
    Redirects to the Generate Feedback Module of Feedback Controller
*/
router.post('/generateFeedback', [
    body('orderID').trim().not().isEmpty().withMessage('OrderID is required'),
    body('email').trim().isEmail().withMessage('Email is required').normalizeEmail(),
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('subject').trim().not().isEmpty().withMessage('Subject is required'),
    body('message').trim().not().isEmpty().withMessage('Message is required')
], feedbackController.generateFeedback);


/* 
Get All Feedback Route 
    Requires: email
    Redirects to the Get All Feedbacks Module of Feedback Controller
*/
router.post('/fetchFeedbacks', [
    body('email').trim().isEmail().withMessage('Email is required').normalizeEmail()
], feedbackController.fetchFeedbacks);

module.exports = router;