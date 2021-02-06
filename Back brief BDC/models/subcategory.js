const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({

    name : {
        type: String,
        required: true
    },

    img : {
        type: String,
        required: true
    },

    catid : {
        type: String,
        reference : 'categories'
    }


})

module.exports = mongoose.model('subcategory', subcategorySchema)