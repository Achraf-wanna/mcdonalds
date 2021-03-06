const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({

    productid : {
        type: String,
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
        type: String,
        
    },

    cardfidele : {
        type: String,
        
    }


})

module.exports = mongoose.model('commande', commandeSchema)