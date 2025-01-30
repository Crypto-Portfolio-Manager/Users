const User = require('../../entity/user.js'); 
const {createUserSql, getByEmail, alreadyExists} = require('../repo/users_repo.js')
const bcrypt = require('bcrypt');

module.exports = {
    createUser,
    loginUser
};

async function createUser(user) {
    try {
        const emailExists = await alreadyExists(user.email);
        if (!emailExists) {
            throw new Error("User with this email already exists");
        }
    
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.passwordHash, saltRounds); 
        user.passwordHash = hashedPassword;
        await createUserSql(user);
    
    } catch(error) {
        throw error
    }

}

async function loginUser(user) {

    try {
        
        getPasswordByEmail =  await getByEmail(user.email);
        if (!getPasswordByEmail) {
            throw new Error("User not found or incorrect email");
        }

        
        const isMatch = await bcrypt.compare(user.passwordHash, getPasswordByEmail);
        if (!isMatch) {
            throw new Error('incorrect password');
        }

    } catch(error) {
        throw error
    }
}

