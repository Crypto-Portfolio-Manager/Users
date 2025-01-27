const pool = require('../../config/db.js'); 
const User = require('../../entity/user.js'); 


async function createUserSql(user) {
    try {
        const query = `
            INSERT INTO userlist (name, email, password_hash) 
            VALUES ($1, $2, $3)
        `; 
        const values = [user.name, user.email, user.passwordHash]; 

        
        const result = await pool.query(query, values);
        console.log('Пользователь добавлен:', result.rowCount); 
    } catch (error) {
        console.error('Ошибка при добавлении пользователя:', error);
    }
}

module.exports = createUserSql;
