const mongoose = require("mongoose")

// name
// password
// email
// userType

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    userType : {
        type : String,
        default : "USER",
        enum : ["USER","ADMIN","LIBRARIAN"]
    },
    // books : {
    //     bookId:{
    //         type: Number,
    //         startTime: {
    //             type: Date,
    //             required: true
    //         },
    //         endTime: {
    //             type: Date,
    //             required: true
    //         }
    //     }
    // }
})

module.exports = mongoose.model("users",userSchema)