const User = require('../../entity/user.js'); // Подключение класса User
const createUserSql = require('../repo/users_repo.js')
const bcrypt = require('bcrypt');

async function createUser(email,password,name) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds); 
    const user = new User(
        null, 
        email,
        name,
        hashedPassword
    );
    await createUserSql(user)
}

module.exports = {
    createUser
};