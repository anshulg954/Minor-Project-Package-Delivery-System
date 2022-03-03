const { validationResult } = require("express-validator");

const User = require("../models/users");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const client = require("twilio")(
);

/*
Signup Module 
    1. Take the user input from the frontend
    2. Check if the user already exists
    3. If not, create a new user
    4. Send the OTP to the user's contact
    5. Redirect the user to the verify page
*/
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const contact = req.body.contact;
  const otp = this.generateOTP(6);
  let generatedAt = new Date();
  generatedAt = generatedAt.toISOString().slice(0, 19).replace("T", " ");
  try {
    //Return error if the user already exists
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Email Already Exists!!",
      });
    }

    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 12);
    const userDetails = {
      name: name,
      email: email,
      password: hashedPassword,
      contact: contact,
      otp: otp,
      generatedAt: generatedAt,
    };
    // Generate and Send OTP
    client.messages
      .create({
        body: "Your One Time Password is " + otp,
        from: "",
        to: contact,
      })
      .then((message) => console.log(message.sid));

    // Create a new user
    await User.createUser(userDetails);
    res.status(201).json({
      message: "User created successfully!",
      email: email
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/* 
Login Module
    1. Take the user input from the frontend
    2. Check if the user exists
    3. If exists, get the user email and password
    4. Check if the password is correct
    5. If correct, send the token to the user
    6. Redirect the user to the home page if correct 
    7. Redirect the user to the login page if incorrect
*/

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const password = req.body.password;
  try {
    // Return error if the email or password doesn't match criteria
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
    // Get the user details
    const user = await User.getUserByEmail(email);

    // Return error if the user does not exist
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    if (user[0].length !== 1) {
      const error = new Error("Email DOES NOT exists!!");
      error.statusCode = 401;
      throw error;
    }

    // Check if the password is correct
    const isEqual = await bcrypt.compare(password, user[0][0].password);

    // Return error if the password is incorrect
    if (!isEqual) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }

    // If correct, send the token to the user
    const token = jwt.sign(
      {
        email: user[0][0].email,
        userId: user[0][0].uID,
      },
      "secret",
      { expiresIn: "1h" }
    );

    //  Redirect the user to the home page if correct
    res.status(200).json({
      message: "Login Successful",
      token: token,
      userId: user[0][0].uID,
      name: user[0][0].name,
      email: user[0][0].email,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/*
Verify Module
    1. Take the user input from the frontend
    2. Check if the user exists
    3. If exists, get the user otp and contact
    4. Check if the otp is correct
    5. If correct, update verified as 1 in userDB
    6. Redirect the user to the login page if correct
    7. Redirect the user to the verify page if incorrect
*/

exports.verify = async (req, res, next) => {
  const errors = validationResult(req);
  const otp = req.body.otp;
  const email  = req.body.email;
  try {
    // Get the user details
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    // Check if the user exists and the otp is correct
    if (user[0].length !== 1) {
      const error = new Error("OTP & USER DOES NOT exists!!");
      error.statusCode = 401;
      throw error;
    }
    if (user[0][0].otp !== otp) {
      const error = new Error("Invalid OTP");
      error.statusCode = 401;
      throw error;
    }

    // If correct, update verified as 1 in userDB
    user[0][0].verified = 1;
    await User.updateVerifiedUser(user[0][0]);

    // Redirect the user to the login page if correct
    res.status(200).json({
      message: "Verification Successful",
      isVerified: true,
    });

    // Return error if the contact or password doesn't match criteria
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid OTP/Contact",
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/*
Generate OTP Module
    1. Generate a random number of 6 digits
    2. Return the number
*/
exports.generateOTP = (otp_length) => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
