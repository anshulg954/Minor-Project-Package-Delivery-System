const express = require('express');

const {body} = require('express-validator');

const router = express.Router();

const userController = require('../controllers/user');

/*  
User Details Route 
    Requires: email, country, state, city, zip
    Redirects to the Add Details Module of User  Details Controller
*/
router.post('/addDetails', [
    body('email').trim().isEmail().withMessage('Email is required').normalizeEmail(),
    body('country').trim().not().isEmpty().withMessage('Country Name is required'),
    body('state').trim().not().isEmpty().withMessage('State Name is required'),
    body('city').trim().not().isEmpty().withMessage('City Name is required'),
    body('zip').trim().not().isEmpty().withMessage('ZIP Code is required')
], userController.addDetails);
/*  
Ge tUser Details Route 
    Requires: email
    Redirects to the Get Details Module of User Details Controller
*/
router.post('/getDetails', [
    body('email').trim().isEmail().withMessage('Email is required').normalizeEmail()
], userController.getDetails);
module.exports = router;
