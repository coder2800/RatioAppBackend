const mongoose= require("mongoose");
const env = require('dotenv').config().parsed;

const mongooseURI=env.MONGOOSE_URI;

const connectToMongo = () =>{
    mongoose.connect(mongooseURI)
    .then(console.log("Connected to MongoDB"))
}

module.exports = connectToMongo