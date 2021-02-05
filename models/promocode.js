const mongoose = require('mongoose');

const promocodeSchema = new mongoose.Schema({


    code : {
        type: String,
        required: true
    },

    reduc : {
        type: Number,
        required: true
    },
    
    is_valid : {
        type: Boolean,
        required: true
    },


})

module.exports = mongoose.model('promocode', promocodeSchema)