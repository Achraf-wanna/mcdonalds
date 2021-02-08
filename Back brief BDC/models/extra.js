const mongoose = require('mongoose');

const extraSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('extra', extraSchema)