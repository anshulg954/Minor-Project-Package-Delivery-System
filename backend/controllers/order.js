const { validationResult } = require("express-validator");

const User = require("../models/users");

const OrderDetails = require("../models/order");

/*
Create Details 
    1. Take the user details from the frontend
    2. Check if the user exists
    3. If the user exists, add the order details to the DB
    4. If the user does not exist, return error
    5. Return success message if details are added with estimated cost
*/
exports.createDetails = async (req, res, next) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const type = req.body.type;
  const weight = req.body.weight;
  const length = req.body.length;
  const breadth = req.body.breadth;
  const picture = req.body.picture;
  const pAddress = req.body.pAddress;
  const dAddress = req.body.dAddress;
  const altContact = req.body.altContact;
  const couponCode = req.body.couponCode;
  try {
    const users = await User.getUserByEmail(email);
    if (users[0].length !== 1) {
      const error = new Error("USER DOES NOT exists!!");
      error.statusCode = 401;
      throw error;
    }
    // Return error if the user does not exist
    let estdCost = this.createCostEstimation(
      type,
      weight,
      length,
      breadth,
      couponCode
    );
    let orderID = this.generateOrderID();
    // Get the order details
    const orderDetails = {
      orderID: orderID,
      email: email,
      type: type,
      weight: weight,
      length: length,
      breadth: breadth,
      picture: picture,
      pAddress: pAddress,
      dAddress: dAddress,
      altContact: altContact,
      couponCode: couponCode,
      estdCost: estdCost,
    };
    // Add details of new order to the DB
    await OrderDetails.createDetails(orderDetails);

    // Return success message with estimated cost and tentative orderID
    res.status(201).json({
      message: "Details created successfully!",
      estdCost: estdCost,
      orderID: orderID,
    });
  } catch (err) {
    console.log(err);
  }
};

/*
Get Details 
    1. Input the email of User that is logged in.
    2. Call the DB to get the order details from the email id.
    2. Return the details of the order
*/
exports.getDetails = async (req, res, next) => {
  const email = req.body;
  try {
    ordersAll = await OrderDetails.getDetailsByEmail(email);
    res.status(201).json({
      ordersAll,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
Process Order 
  1. Input the orderID and the email of the user that is logged in.
  2. Check if the orderID exists in the DB.
  3. If the orderID exists, check if the email of the user matches the email of the user that is logged in.
  4. If the email matches, update the status of the order to "Accepted".
  5. Return success message if the order is processed with respective tracking ID.
*/
exports.processOrder = async (req, res, next) => {
  const orderID = req.body[0];
  const email = req.body[1];
  try {
    order = await OrderDetails.getOrderbyID(orderID);
    if (order[0].email == String(email)) {
      trackingID = this.generateUUID();
      let status = "Accepted";
      let deliveryStatus = "Pending";
      let paymentStatus = "Cash On Delivery";
      await OrderDetails.updateOrder(String(trackingID), status, orderID, deliveryStatus, paymentStatus);
    }
    res.status(201).json({
      message: "Order Accepted",
      trackingID: trackingID,
    });
  } catch (error) {
    console.log(error);
  }
};

// Generates Unique Order ID
exports.generateOrderID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Generates Tracking ID of 16 digits
exports.generateUUID = () => {
  let d = new Date().getTime(),
    d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
};

/* COST Estimator 
It calculates the cost of the order based on:
  1. type of the package, and since this is a dropdown,
     Type 1: Regular Package
     Type 2: Medium Package
     Type 3: Large Package
  2. the weight of the package,
  3. the length of the package,
  4. the breadth of the package
*/
exports.createCostEstimation = (type, weight, length, breadth, couponCode) => {
  let estdCost = 0;
  if (type == "1") {
    estdCost = weight * length * breadth * 0.5;
  } else if (type == "2") {
    estdCost = weight * length * breadth * 1.5;
  } else if (type == "3") {
    estdCost = weight * length * breadth * 2.5;
  } else {
    throw new Error("Invalid type");
  }
  if (couponCode == "MAXFIFTY") {
    estdCost = estdCost - 50;
  }
  return estdCost;
};
