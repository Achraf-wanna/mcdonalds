const mongoose = require('mongoose');


const produitSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true
    },

    price : {
        type: Number,
        required: true
    },

    img : {
        type: String,
        required: true
    },

    subcatid : {
        type: String,
        reference : 'subcategories'
    },

    extraid : {
        type: String,
        reference : 'extras'
    }


})


module.exports = mongoose.model('produit', produitSchema)