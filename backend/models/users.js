const db = require('../utils/db');

/*
User Model
        Responsible for:
        1. Creating the new user
        2. Getting the user details with Contact
        3. Getting the user details with Email ID
        4. Updating the user verified status
*/

module.exports = class User{
    constructor(name, email, password){
        this.password = password;
        this.email = email;
        this.name = name;
    }

    static async getUserByEmail(email) {
        try{
        return await db.execute('SELECT * FROM users WHERE email = ?', [email]
        ); 
        }
        catch(err){
            console.log(err);
        }
    }

    static async createUser(user){
        try{
            const [rows, fields] = await db.execute(`INSERT INTO users (name, email, password, contact, otp, generatedAt) VALUES (?, ?, ?, ?, ?, ?)`, 
            [user.name, user.email, user.password, user.contact, user.otp, user.generatedAt]);
            return rows;
        }catch(err){
            throw err;
        }
    }

    static async getAllUsers(){
        try{
            const [rows, fields] = await db.execute('SELECT * FROM users');
            return rows;
        }catch(err){
            throw err;
        }
    }

    static async getUserByContact(contact){
        console.log(contact);
        try{
            const [rows, fields] = await db.execute('SELECT * FROM users WHERE contact = ?', [contact]);
            return rows;
        }catch(err){
            throw err;
        }
    }

    static async updateVerifiedUser(user){
        try{
            const [rows, fields] = await db.execute('UPDATE users SET verified = ? WHERE contact = ?', 
            [user.verified, user.contact]);
            return rows;
        }catch(err){
            throw err;
        }
    }
};
