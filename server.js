// Dynamic Implementation of a gRPC API Under Node.js
let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

const server = new grpc.Server();
const SERVER_ADDRESS = "127.0.0.1:50051";

//load the .proto file into memory at runtime
let proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("protos/chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

let users = [];

//Receive message from client joining
function join(call, callback) {
  users.push(call);
  notifyChat({ user: "Server", text: "new user joined ..." });
}

//Receive message from client
function send(call, callback) {
  // Error handling test
  if (call.request.user === ''){
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'The username is empty, please fill it out properly'
    });
  } else {
    notifyChat(call.request);
    // Just a response from server to confirm everything is ok
    callback(null, {user: 'Server', text: 'OK'});
  }
}

//Send message to all connected clients
function notifyChat(message) {
  users.forEach(user => {
    user.write(message);
  });
}

//Define server with the methods and start it
server.addService(proto.example.Chat.service, { join: join, send: send });

server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());

server.start();

console.log("Server started");
