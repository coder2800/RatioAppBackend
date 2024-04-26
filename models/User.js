const mongoose = require("mongoose");
const {Schema} = mongoose;

//schema of the user for storing the details
const userSchema = new Schema ({
    //first name of the user
    firstName: {
        type: String,
        required: true
    },
    //email of the user
    email: {
        type: String,
        required: true,
        unique: true
    },
    //date of birth of the user
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: Boolean,//true for male and false for female
        required: true
    },
    //city where the user lives
    cityOfResidence: {
        type: String,
        required: true
    },
    //the location of the user -The type can be point or polygon etc.
    location: {
        type: { type: String, enum: ['Point']},
        coordinates: { type: [Number], default: []} // The coordinates in the form of [longitude, latitude]
    }, 
})
module.exports =  mongoose.model('user', userSchema)
