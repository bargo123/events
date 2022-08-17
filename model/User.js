const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");



const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name should be provided"],
        minlength: 3,


    },
    email: {
        type: String,
        required: [true, "email should be provided"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "password should be provided"],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
});

UserSchema.pre("save", async function() {
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});

UserSchema.methods.comparePasswords = async function(enterdPassword) {
    const passMatched = await bycrypt.compare(enterdPassword, this.password)
    return passMatched;
}

module.exports = mongoose.model("Users", UserSchema);