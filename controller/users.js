const {createUser, loginUser} = require('../usecase/webapi/users.js')
const User = require('../entity/user.js')
const grpc = require('@grpc/grpc-js');

module.exports = {
    registerUserController, 
    loginUserController,
};


async function registerUserController(call, callback) {
    const { email, password, name } = call.request;
    const user = new User(
        null, 
        email,
        name,
        password
    );
    try {
        await createUser(user);
        callback(null, { success: true });
    } catch(error){
        callback({
            code: grpc.status.INTERNAL,
            message: `Error creating user: ${error.message}`,
        }, null);
    }
    
  }
  

async function loginUserController(call, callback) {
    const {email, password} = call.request;
    const user = new User (
        null,
        email,
        null, 
        password
    );

    try {
        await loginUser(user)
        callback(null, { success: true });
    } catch(error) {
        callback({
            code: grpc.status.INTERNAL,
            message: `User login error: ${error.message}`,
        }, null);
    }
}