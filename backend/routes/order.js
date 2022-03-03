const express = require('express');

const {body} = require('express-validator');

const router = express.Router();

const orderController = require('../controllers/order');

/* 
Create Details Route 
    Requires: email, type, weight, length, breadth, picture, pAddress, dAddress, altContact
    Redirects to the Create Details Module of Order Controller
*/
router.post('/createDetails', [
    body('email').trim().isEmail().withMessage('Email is required').normalizeEmail(),
    body('type').trim().not().isEmpty().withMessage('Type is required'),
    body('weight').trim().not().isEmpty().withMessage('Weight is required'),
    body('length').trim().not().isEmpty().withMessage('Length is required'),
    body('breadth').trim().not().isEmpty().withMessage('Breadth is required'),
    body('picture').trim().not().isEmpty().withMessage('Picture is required'),
    body('pAddress').trim().not().isEmpty().withMessage('Pickup Address is required'),
    body('dAddress').trim().not().isEmpty().withMessage('Drop Address is required'),
    body('altContact').trim().not().isEmpty().withMessage('Alternate Contact is required'),
    body('couponCode')
    ], orderController.createDetails);

/*
Get All Orders Route
    Requires: email
    Redirects to the Get Details Module of Order Controller
*/
router.post('/getDetails', [
    body().trim().isEmail().withMessage('Email is required').normalizeEmail(),
    ], orderController.getDetails);

/*
Process Order Route
    Requires: orderID, email
    Redirects to the Process Order Module of Order Controller
*/
router.post('/processOrder', [
    body('orderID').not().isEmpty().withMessage('Order ID is required'),
    body('email').trim().isEmail().withMessage('Email is required').normalizeEmail(),

],orderController.processOrder);

module.exports = router;
