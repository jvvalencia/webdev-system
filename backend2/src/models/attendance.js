const mongoose = require('mongoose')
const validator = require('validator')

const attendanceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timein: {
        type: String,
        required: true
    },
    timeout: {
        type: String,
    }

},  { versionKey: false

})


const attendance =  new mongoose.model('attendance',attendanceSchema);

module.exports = attendance;