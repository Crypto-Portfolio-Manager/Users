const {createUser} = require('../usecase/webapi/users.js')
async function registerUser(call, callback) {
    const { email, password, name } = call.request;
    try {
        createUser(email,password,name)
    } catch(error){
        console.error('Ошибка', error);
    }
    
  }
  
  module.exports = {
    registerUser, 
    loginUser
};