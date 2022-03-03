const { validationResult } = require("express-validator");

const User = require("../models/users");
const Feedback = require("../models/feedback");
/*
Generate Feedback Module 
    1. Take the user details from the frontend
    2. Check if the user with that email exists
    3. If the user exists, add the feedback/query details to the DB
    4. If the user does not exist, return error
    5. Return success message if details are added.
*/
exports.generateFeedback = async (req, res, next) => {
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const users = await User.getUserByEmail(req.body.email);
    if (users[0].length !== 1) {
      const error = new Error("USER DOES NOT exists!!");
      error.statusCode = 401;
      throw error;
    }
    const feedback = {
        orderID: req.body.orderID,
        email: req.body.email,
        name: req.body.name,
        subject: req.body.subject,
        message: req.body.message
    };
    await Feedback.createFeedback(feedback);
    res.status(201).json({
            message: 'Feedback created successfully',
            feedback: feedback
        });
}catch (err) {
    console.log(err);
  }
}

exports.fetchFeedbacks = async (req, res, next) => {
    try{
    const users = await User.getUserByEmail(req.body[0].email);
    if (users[0].length !== 1) {
      const error = new Error("USER DOES NOT exists!!");
      error.statusCode = 401;
      throw error;
    }
    const feedbacks = await Feedback.getAllFeedbacks(req.body[0].email);
    res.status(200).json({
        feedbacks
    });
}catch (err) {
    console.log(err);
  }
}
