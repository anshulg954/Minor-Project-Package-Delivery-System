const db = require('../utils/db');
/*
Order Details Model
    Responsible for:
        1. Creating the order details
        2. Getting the order details with User ID
        3. Getting the order details with Order ID
        4. Updating the order details
*/
module.exports = class OrderDetails{
    constructor(email, type, weight, length, breadth, picture, pAddress, dAddress, altContact, estdCost){
        this.email = email;
        this.type = type;
        this.weight = weight;
        this.length = length;
        this.breadth = breadth;
        this.picture = picture;
        this.pAddress = pAddress;
        this.dAddress = dAddress;
        this.altContact = altContact;
        this.estdCost = estdCost;
    }

    static async createDetails(orderDetails){
        try{
            const [rows, fields] = await db.execute(`INSERT INTO orderDetails (orderID, email, type, weight, length, breadth, picture, pAddress, dAddress, altContact, estdCost, couponCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [orderDetails.orderID, orderDetails.email, orderDetails.type, orderDetails.weight, orderDetails.length, orderDetails.breadth, orderDetails.picture, orderDetails.pAddress, orderDetails.dAddress, orderDetails.altContact, orderDetails.estdCost, orderDetails.couponCode]);
            return rows;
        }catch(err){
            throw err;
        }
    }

    static async getDetailsByUserId(id){
        try{
            const [rows, fields] = await db.execute('SELECT * FROM orderDetails WHERE id = ?', [id]);
            return rows;
        }catch(err){
            throw err;
        }
    }

    static async getDetailsByEmail(email){
        try{
            const [rows, fields] = await db.execute('SELECT * FROM orderDetails WHERE email = ?', [email]);
            return rows;
        }catch(err){
            throw err;
        }
    }

    static async getOrderbyID(id){
        try {
            const [rows, fields] = await db.execute('SELECT * FROM orderDetails WHERE orderID = ?', [id]);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    static async updateOrder(trackingID, status, orderID, deliveryStatus, paymentStatus){
        try {
            const [rows, fields] = await db.query('UPDATE orderDetails SET trackingID = ?, status = ?, deliveryStatus=?, paymentStatus=? WHERE orderID = ?', [trackingID, status, deliveryStatus, paymentStatus, orderID]);
            return rows;
        }
        catch (err) {
            throw err;
        }
    }
}