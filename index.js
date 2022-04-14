const express = require('express');
const mongoose = require('mongoose');
const AppConfig = require('./src/config/app');
const Server = require('./src/server');

const app = express();


app.use("/api/v1", require("./src/routes"));

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! Shutting down...');
  console.log(err);
  process.exit(1);
});

const server = new Server(app, AppConfig);

server.$beforeInit = () => {
  server.app.use(express.json());

  connectDB();
};

const connectDB = () => {
  mongoose
    .connect(AppConfig.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log('Connected to Database'));
};

server.boot();

process.on('unhandledRejection', (err) => {
  console.log('name:', err.name, 'message:', err.message);
  console.log('Unhandled Rejection! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
