//Imports mongoose from mongoose and MongoDB URI from environmental variables
const mongoose = require('mongoose');
const { DATABASE_URI } = process.env

//Connects to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URI)

//Console.logs status of MongoDB connection
mongoose.connection
    .on('open', () => console.log('You are connected to mongoose'))
    .on('close', () => console.log('You are disconnected from mongoose'))
    .on('error', (error) => console.log(error));

