const express = require('express')
const router = express.Router()
const promocode = require('../models/promocode')


//all promocodes
router.get('/' , async (req, res) => {
    try {
       const promocodes = await promocode.find()
       res.json(promocodes)
   } catch (err) {
       
       res.status(500).json({ message: err.message })
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
       
   } catch (err) {
       res.status(400).json({ message: err.message })
       
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

   } catch (err) {
       res.status(400).json({ message: err.message })
       
   }

})
//Deleting product
router.delete('/:id' , getpromocode , async (req, res) => {
   try {

       await res.promocodes.remove()
       res.json({ message: 'Deleted Succesfully' })
   } catch (err) {
       res.status(500).json({ message: err.message })
       
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