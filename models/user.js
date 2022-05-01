const mongoose = require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", UserSchema);
UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});
module.exports = User;