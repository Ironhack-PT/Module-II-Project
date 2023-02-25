const mongoose = require('mongoose');
require("dotenv").config()
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/module-2-project';
mongoose.set('strictQuery', true)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    autoIndex: true, 
  })
    .then(response => console.log(`Connected to Mongo! Database name: '${response.connections[0].name}'`))
    .catch(err => console.error('Error connecting to mongo', err,MONGODB_URI))
  
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });
  
  module.exports.MONGODB_URI = MONGODB_URI
