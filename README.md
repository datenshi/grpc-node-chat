# gRPC chat demo app with Node JS

This project creates a simple command line chat using gRPC and NodeJS to show a stream and bidirectional communication.

We can create as many instances of the client as we want. We can input different names for users and just write the message we want to send and press enter (when enter key is pressed the inline message will be sent)

# Reference guides:

1. Install protocol buffers compiler: https://grpc.io/docs/protoc-installation/

2. Install gRPC module (I assume Node is already installed in the system): 
```
$ npm i grpc
$ npm i grpc-tools
```
3. Dynamic implementation of gRPC and protocol buffers: https://grpc.io/docs/languages/node/basics/

## Build JavaScript libraries

Current project uses dynamic implementation: so there is no extra step to build the JavaScript library, everything is done runtime. We use the JavaScript library @grpc/proto-loader to load the .proto file and be able to work with the messages and services implemented in it.

## Working with the project

1. First we remove package-lock.json to prevent conflicts: 

``rm package-lock.json``


2. Install Modules:

    ``$ npm install``

3. Start Server:

    ``$ node server``

4. Start client(s): (use different terminals to run multiple clients)

    ``$ node client``

### Reference project/article: https://techblog.fexcofts.com/2018/07/20/grpc-nodejs-chat-example/