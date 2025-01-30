const pool = require('../../config/db.js'); 

module.exports = {
    createUserSql,
    getByEmail,
    alreadyExists 
};

async function createUserSql(user) {
    try {
        const query = `
            INSERT INTO userlist (name, email, password_hash) 
            VALUES ($1, $2, $3)
        `; 
        const values = [user.name, user.email, user.passwordHash]; 

        
        const result = await pool.query(query, values);
        if (result.rowCount > 0) {
           return true 
        } else {
            return false; 
        }
    } catch (error) {
        console.error('Error adding user:', error);
        throw error
    }
}

async function getByEmail(email) {
   
    try {
        const query = `SELECT email,password_hash FROM userlist WHERE email = $1;`;
        const result = await pool.query(query, [email]);
       

        if (result.rowCount > 0) {
            return result.rows[0].password_hash;
        } else {
            return null; 
        }
    } catch(error) {
        throw error 
    }
}

async function alreadyExists(email) {
    try {
        const query = `SELECT email,password_hash FROM userlist WHERE email = $1;`;
        const result = await pool.query(query, [email]);
       

        if (result.rowCount > 0) {
            return false;
        } else {
            return true; 
        }
    } catch(error) {
        throw error 
    }
}

