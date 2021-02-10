const express = require('express')
const router = express.Router()
const produit = require('../models/produit')
const logs = require('../models/logs');
const log = require('../log');





//all products
router.get('/' , async (req, res) => {
    try {
       const produits = await produit.find()
       res.json(produits)
       
       log({
        file: 'produit.js',
        line: '13',
        info: 'Get all Products',
        type: 'info'
    }, logs);
   } catch (err) {
       
       res.status(500).json({ message: err.message })
       log({
        file: 'produit.js',
        line: '22',
        info: err,
        type: 'Critical'
    }, logs);
   }
})



//one product
router.get('/:id' , getproduit , (req, res) => {
   res.json(res.produits)
})

// find product by subcat id
router.get('/findProdBySubId/:subcatid', async (req,res) => {
    try{
        const produits = await produit.find({}).where('subcatid').equals(req.params.subcatid)
        res.send(produits)
        log({
            file: 'produit.js',
            line: '43',
            info: 'Get product by subcategory id',
            type: 'info'
        }, logs);
       
    } catch (err) {
        res.status(500).json({ message: err.message})
        log({
            file: 'produit.js',
            line: '52',
            info: err,
            type: 'Critical'
        }, logs);
       
    }
})

//creating product
router.post('/', async (req, res) => {
   const produits = new produit({
       name: req.body.name,
       price: req.body.price,
       img: req.body.img,
       subcatid: req.body.subcatid,
       extraid: req.body.extraid
   })
   try {
       const newproduit = await produits.save()
       res.status(201).json(newproduit)
       log({
        file: 'produit.js',
        line: '74',
        info: 'Post product',
        type: 'info'
    }, logs);
       
   } catch (err) {
       res.status(400).json({ message: err.message })
       log({
        file: 'produit.js',
        line: '83',
        info: err,
        type: 'Critical'
    }, logs);
       
   }


})
//updating product
router.patch('/:id' , getproduit , async (req, res) => {
   if (req.body.name != null) {
       res.produits.name = req.body.name
   }
   
   if (req.body.price != null) {
       res.produits.price = req.body.price
   }

   if (req.body.img != null) {
    res.produits.img = req.body.img
}

   if (req.body.subcatid != null) {
    res.produits.subcatid = req.body.subcatid
}

   try {
       const updatedproduit = await res.produits.save()
       res.json(updatedproduit)
       log({
        file: 'produit.js',
        line: '115',
        info: 'Patch product',
        type: 'info'
    }, logs);

   } catch (err) {
       res.status(400).json({ message: err.message })
       log({
        file: 'produit.js',
        line: '124',
        info: err,
        type: 'Critical'
    }, logs);
       
   }

})
//Deleting product
router.delete('/:id' , getproduit , async (req, res) => {
   try {

       await res.produits.remove()
       res.json({ message: 'Deleted Succesfully' })
       log({
        file: 'produit.js',
        line: '140',
        info: 'Delete product',
        type: 'info'
    }, logs);
   } catch (err) {
       res.status(500).json({ message: err.message })
       log({
        file: 'produit.js',
        line: '148',
        info: err,
        type: 'Critical'
    }, logs);
       
   }


})


async function getproduit(req, res, next) {

   let produits

   try {
    produits = await produit.findById(req.params.id)
       if (produits == null) {
           return res.status(404).json({ message: 'Cannot find category'})
       }
   } catch (err) {
       
       return res.status(500).json({ message: err.message })
   }

   res.produits = produits
   next()
}

module.exports = router