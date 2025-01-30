const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const User = require('../entity/user.js');
const {registerUserController, loginUserController} = require('../controller/users.js')

const PROTO_PATH = '/Users/stepansalikov/CryptoManager/Users/proto/user.proto'
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const usersProto = grpc.loadPackageDefinition(packageDefinition).usersproto;


function main() {
  const server = new grpc.Server();
  server.addService(usersProto.Greeter.service, { RegisterUser: registerUserController, LoginUser: loginUserController });

  const port = 50051;
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server running at http://localhost:${bindPort}`);
    server.start();
  });
}

main();
