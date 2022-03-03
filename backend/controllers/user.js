const { validationResult } = require("express-validator");

const User = require("../models/users");
const UserDetails = require("../models/userDetails");

/*
Create Details 
    1. Take the user details from the frontend
    2. Check if the user exists
    3. If the user exists, add the details to the DB
    4. If the user does not exist, return error
    5. Return success message
*/

exports.addDetails = async (req, res, next) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const country = req.body.country;
  const state = req.body.state;
  const city = req.body.city;
  const zip = req.body.zip;
  const address = req.body.address;
  try {
    const user = await User.getUserByEmail(email);
    // Return error if the user does not exist
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
    // Get the user details
    const userDetails = {
      id: user[0][0].uID,
      country: country,
      state: state,
      city: city,
      zip: zip,
      address: address,
    };
    // Add details of new user to the DB
    await UserDetails.createDetails(userDetails);
    res.status(201).json({
      message: "Details created successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};

/*
Get USER Details 
    1. Input the email of User that is logged in.
    2. Call the DB to get the user details from the USERS DB as well USER DETAILS DB.
    2. Return the COMBINED details of the USER
*/
exports.getDetails = async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await User.getUserByEmail(email);
        // Return error if the user does not exist
        if (!user) {
        return res.status(400).json({
            message: "Invalid Email or Password",
        });
        }
        // Get the user details
        const userDetails = await UserDetails.getDetailsByUserId(user[0][0].uID);

        // Return only the insensitive user details
        userCombined = {
            id: user[0][0].uID,
            email: user[0][0].email,
            name: user[0][0].name,
            contact: user[0][0].contact,
            country: userDetails[0].country,
            state: userDetails[0].state,
            city: userDetails[0].city,
            zip: userDetails[0].ZipCode,
            address: userDetails[0].address,
        };
        res.status(200).json({
        userCombined
        });
    } catch (err) {
        console.log(err);
    }
}
