const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({

    productid : {
        type: mongoose.Schema.Types.ObjectId,
        reference : 'produits'
    },

    price : {
        type: String,
        required: true
    },

    quantite : {
        type: Number,
        required: true
    },
    
    tableserv : {
        type: Number,
        required: true
    },
    
    promocode : {
        type: mongoose.Schema.Types.ObjectId,
        reference : 'promocode'
    },

    cardfidele : {
        type: mongoose.Schema.Types.ObjectId,
        reference : 'cardfidele'
    },


})

module.exports = mongoose.model('commande', commandeSchema)