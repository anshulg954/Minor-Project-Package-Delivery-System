const db = require('../utils/db');

/*
Feedback Model
    Responsible for:
        1. Creating the feedback/query details for any particular order
        2. Getting all the submitted feedbacks details with email ID
*/
module.exports = class Feedback{
    constructor(orderID, email, name, subject, message){
        this.orderID = orderID;
        this.email = email;
        this.name = name;
        this.subject = subject;
        this.message = message;
    }

    static async createFeedback(feedback){
        try{
            const [rows, fields] = await db.execute(`INSERT INTO feedback (orderID, email, name, subject, message) VALUES (?, ?, ?, ?, ?)`, 
            [feedback.orderID, feedback.email, feedback.name, feedback.subject, feedback.message]);
            return rows;
        }catch(err){
            throw err;
        }
    }

    static async getAllFeedbacks(email){
        try{
            const [rows, fields] = await db.execute(`SELECT * FROM feedback WHERE email = ?`, [email]);
            return rows;
        }catch(err){
            throw err;
        }
    }
}
