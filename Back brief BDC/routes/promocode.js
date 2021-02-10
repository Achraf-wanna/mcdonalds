const express = require('express')
const router = express.Router()
const promocode = require('../models/promocode')
const logs = require('../models/logs');
const log = require('../log');


//all promocodes
router.get('/' , async (req, res) => {
    try {
       const promocodes = await promocode.find()
       res.json(promocodes)
       log({
        file: 'promocode.js',
        line: '12',
        info: 'Get all promocodes',
        type: 'info'
    }, logs);
   } catch (err) {
       
       res.status(500).json({ message: err.message })
       log({
        file: 'promocode.js',
        line: '21',
        info: err,
        type: 'critical'
    }, logs);
   }
})
//one promocode
router.get('/:id' , getpromocode , (req, res) => {
   res.json(res.promocodes)
})
//creating product
router.post('/', async (req, res) => {
   const promocodes = new promocode({
       code: req.body.code,
       reduc: req.body.reduc,
       is_valid: req.body.is_valid
   })
   try {
       const newpromocode = await promocodes.save()
       res.status(201).json(newpromocode)
       log({
        file: 'promocode.js',
        line: '43',
        info: 'Post Product',
        type: 'info'
    }, logs);
       
   } catch (err) {
       res.status(400).json({ message: err.message })
       log({
        file: 'promocode.js',
        line: '52',
        info: err,
        type: 'Critical'
    }, logs);
       
   }


})
//updating promocode
router.patch('/:id' , getpromocode , async (req, res) => {
   if (req.body.code != null) {
       res.produits.code = req.body.code
   }
   
   if (req.body.reduc != null) {
       res.produits.reduc = req.body.reduc
   }

   if (req.body.is_valid != null) {
    res.produits.is_valid = req.body.is_valid
}

   try {
       const updatedpromocode = await res.promocodes.save()
       res.json(updatedpromocode)
       log({
        file: 'promocode.js',
        line: '80',
        info: 'Patch product',
        type: 'info'
    }, logs);

   } catch (err) {
       res.status(400).json({ message: err.message })
       log({
        file: 'promocode.js',
        line: '89',
        info: err,
        type: 'Critical'
    }, logs);
       
   }

})
//Deleting product
router.delete('/:id' , getpromocode , async (req, res) => {
   try {

       await res.promocodes.remove()
       res.json({ message: 'Deleted Succesfully' })
       log({
        file: 'promocode.js',
        line: '105',
        info: 'delete Product',
        type: 'info'
    }, logs);
   } catch (err) {
       res.status(500).json({ message: err.message })
       log({
        file: 'promocode.js',
        line: '113',
        info: err,
        type: 'Critical'
    }, logs);
       
   }


})


async function getpromocode(req, res, next) {

   let promocodes

   try {
    promocodes = await promocode.findById(req.params.id)
       if (promocodes == null) {
           return res.status(404).json({ message: 'Cannot find category'})
       }
   } catch (err) {
       
       return res.status(500).json({ message: err.message })
   }

   res.promocodes = promocodes
   next()
}

module.exports = router