const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true
    },

    price : {
        type: String,
        required: true
    },

    img : {
        type: String,
        required: true
    },

    subcatid : {
        type: mongoose.Schema.Types.ObjectId,
        reference : 'subcategories'
    }


})

module.exports = mongoose.model('produit', produitSchema)