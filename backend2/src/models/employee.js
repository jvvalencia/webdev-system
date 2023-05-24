const mongoose = require('mongoose')
const validator = require('validator')



const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "this email is already exist"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("this email is not valid")
            }
        }
    },
    number: {
        type: Number,
        required: true,
        min: 11,
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }

},  { versionKey: false

})



const employee =  new mongoose.model('employee',employeeSchema);

module.exports = employee;