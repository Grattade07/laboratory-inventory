/* Schema for user accounts */

const mongoose = require("mongoose")

let UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
})

/* exports schema for use. Each document will be called "User" and created using the UserSchema */
module.exports = mongoose.model("User", UserSchema)