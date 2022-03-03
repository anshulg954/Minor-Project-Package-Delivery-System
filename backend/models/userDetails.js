const db = require('../utils/db');

/* 
User Details Model
    Responsible for:
        1. Creating the new user address details
        2. Getting the user details with userID
*/
module.exports = class UserDetails{
    constructor(id, country, state, city, zip){
        this.id = id;
        this.country = country;
        this.state = state;
        this.city = city;
        this.zip = zip;
    }
    // Create User Details
    static async createDetails(userDetails){
        try{
            const [rows, fields] = await db.execute(`INSERT INTO userDetails (id, country, state, city, ZipCode, address) VALUES (?, ?, ?, ?, ?, ?)`, 
            [userDetails.id, userDetails.country, userDetails.state, userDetails.city, userDetails.zip, userDetails.address]);
            return rows;
        }catch(err){
            throw err;
        }
    }

    static async getDetailsByUserId(id){
        try{
            const [rows, fields] = await db.execute('SELECT * FROM userDetails WHERE id = ?', [id]);
            return rows;
        }catch(err){
            throw err;
        }
    }
}