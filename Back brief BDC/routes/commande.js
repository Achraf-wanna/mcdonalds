const express = require('express')
const router = express.Router()
const commande = require('../models/commande')
const logs = require('../models/logs');
const log = require('../log');
const {saveLog} = require('../localLog')


//all products
router.get('/' , async (req, res) => {
    try {
       const commandes = await commande.find()
       res.json(commandes)
       saveLog("Get all Commandes","info","/commande/");
       log({
        file: 'commande.js',
        line: '12',
        info: 'Get all Commandes',
        type: 'info'
    }, logs);
   } catch (err) {
       saveLog(err.message,"critical","/commande/")
       res.status(500).json({ message: err.message })
       log({
        file: 'commande.js',
        line: '21',
        info: err,
        type: 'Critical'
    }, logs);
   }
})
//one product
router.get('/:id' , getcommande , (req, res) => {
   res.json(res.commandes)
})
//creating product
router.post('/', async (req, res) => {
   const commandes = new commande({
    productid: req.body.productid,
       price: req.body.price,
       quantite: req.body.quantite,
       tableserv: req.body.tableserv,
       promocode: req.body.promocode,
       cardfidele: req.body.cardfidele,
       location: req.body.location
   })
   try {
       const newcommande = await commandes.save()
       res.status(201).json(newcommande)
       saveLog("Post Commande","info","/commande/")
       log({
        file: 'commande.js',
        line: '47',
        info: 'Post commande',
        type: 'info'
    }, logs);
       
   } catch (err) {
       res.status(400).json({ message: err.message })
       saveLog(err.message,"critical","/commande/")
       log({
        file: 'commande.js',
        line: '56',
        info: err,
        type: 'Critical'
    }, logs);
       
   }


})
//updating product
router.patch('/:id' , getcommande , async (req, res) => {
   if (req.body.productid != null) {
       res.produits.productid = req.body.productid
   }
   
   if (req.body.price != null) {
       res.produits.price = req.body.price
   }

   if (req.body.quantite != null) {
    res.produits.quantite = req.body.quantite
}

   if (req.body.tableserv != null) {
    res.produits.tableserv = req.body.tableserv
}

if (req.body.promocode != null) {
    res.produits.promocode = req.body.promocode
}
if (req.body.cardfidele != null) {
    res.produits.cardfidele = req.body.cardfidele
}
   try {
       const updatedcommande = await res.commandes.save()
       res.json(updatedcommande)
       saveLog("Patch Commande","info","/commande/id")
       log({
        file: 'commande.js',
        line: '94',
        info: 'Patch commande',
        type: 'info'
    }, logs);

   } catch (err) {
       saveLog(err.message,"critical","/commande/")
       res.status(400).json({ message: err.message })
       log({
        file: 'commande.js',
        line: '103',
        info: err,
        type: 'Critical'
    }, logs);
       
   }

})
//Deleting product
router.delete('/:id' , getcommande , async (req, res) => {
   try {

       await res.commandes.remove()
       res.json({ message: 'Deleted Succesfully' })
       saveLog("Delete commande","info","/commande/")
       log({
        file: 'commande.js',
        line: '119',
        info: 'Delete commande',
        type: 'info'
    }, logs);
   } catch (err) {
    saveLog(err.message,"critical","/commande/")
       res.status(500).json({ message: err.message })
       log({
        file: 'commande.js',
        line: '127',
        info: err,
        type: 'Critical'
    }, logs);
       
   }


})


async function getcommande(req, res, next) {

   let commandes

   try {
    commandes = await commande.findById(req.params.id)
       if (commandes == null) {
           return res.status(404).json({ message: 'Cannot find category'})
       }
   } catch (err) {
       
       return res.status(500).json({ message: err.message })
   }

   res.commandes = commandes
   next()
}

module.exports = router