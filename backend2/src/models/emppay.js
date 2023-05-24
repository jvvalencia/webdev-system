const mongoose = require('mongoose')
const validator = require('validator')



const employeepaySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    ratePerDay: {
      type: Number,
      required: true,
      min: 10,
    },
    numberOfDays: {
        type: Number,
        required: true,
        min: 1,
    },

    deduction: {
        type: Number,
        required: true,
        min: 0,
    },
    totalsalary: {
        type: Number,
        required: true,
        min: 10,
    }
},  { versionKey: false

})



const employeepays =  new mongoose.model('employeepays',employeepaySchema);

module.exports = employeepays;