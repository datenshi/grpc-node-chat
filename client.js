// Dynamic Implementation of a gRPC API Under Node.js
let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var readline = require("readline");

//Read terminal Lines - save us effort to implement a UI
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//load the .proto file into memory at runtime
var proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("protos/chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

const REMOTE_SERVER = "127.0.0.1:50051";

let username;

//Create gRPC client
let client = new proto.example.Chat(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
);

//Start the stream between server and client
function startChat() {
  let channel = client.join({ user: username });

  channel.on("data", onData);

  rl.on("line", function(text) {
    client.send({ user: username, text: text }, (err,res) => {
      if(!err){
        // This can be remove, just for test correct response from server in successful cases
        console.log(`${res.user}: ${res.text}`); 
      } else{
        console.log(err.message);
      }
    });
  });
}

//When server send a message
function onData(message) {
  if (message.user == username) {
    return;
  }
  console.log(`${message.user}: ${message.text}`);
}

//Ask user name than start the chat
rl.question("What's ur name? ", answer => {
  username = answer;

  startChat();
});
