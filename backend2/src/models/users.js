const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "This email is already in use."],
        validate: {
            validator: function(v) {
                return validator.isEmail(v);
            },
            message: "Please enter a valid email address."
        }
    },
    birthday: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, { versionKey: false

})

const user =  new mongoose.model('user', userSchema);

module.exports = user;
