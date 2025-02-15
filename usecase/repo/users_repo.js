const client = require('../../../Portfolio/config/mongodb.js');
const pool = require('../../config/db.js'); 

module.exports = {
    createUserSql,
    getByEmail,
    alreadyExists 
};

async function createUserSql(user) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN');
        const query = `
            INSERT INTO userlist (name, email, password_hash) 
            VALUES ($1, $2, $3)
        `; 
        const values = [user.name, user.email, user.passwordHash]; 

        
        const result = await client.query(query, values);
        if (result.rowCount > 0) {
            await client.query('COMMIT');
           return true 
        } else {
            await client.query('ROLLBACK');
            return false; 
        }
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error adding user:', error);
        throw error
    } finally {
        client.release(); // Возвращаем клиент обратно в пул
    }
}

async function getByEmail(email) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const query = `SELECT email,password_hash FROM userlist WHERE email = $1;`;
        const result = await client.query(query, [email]);
        await client.query('COMMIT');
       

        if (result.rowCount > 0) {
            return result.rows[0].password_hash;
        } else {
            return null; 
        }
    } catch(error) {
        await client.query('ROLLBACK');
        throw error 
    } finally {
        client.release();
    }
}

async function alreadyExists(email) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const query = `SELECT email,password_hash FROM userlist WHERE email = $1;`;
        const result = await client.query(query, [email]);
        await client.query('COMMIT');
       

        if (result.rowCount > 0) {
            return false;
        } else {
            return true; 
        }
    } catch(error) {
        await client.query('ROLLBACK')
        throw error 
    } finally {
        client.release();
    }
}

