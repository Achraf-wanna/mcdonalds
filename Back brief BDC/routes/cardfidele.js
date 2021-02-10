const express = require('express')
const router = express.Router()
const cardfidele = require('../models/cardfidele')


//all promocodes
router.get('/' , async (req, res) => {
    try {
       const cardfideles = await cardfidele.find()
       res.json(cardfideles)
   } catch (err) {
       
       res.status(500).json({ message: err.message })
   }
})
//one promocode
router.get('/:id' , getcardfidele , (req, res) => {
   res.json(res.cardfideles)
})
//creating product
router.post('/', async (req, res) => {
   const cardfideles = new cardfidele({
    pin: req.body.pin,
    reduction: req.body.reduction
   })
   try {
       const newcardfidele = await cardfideles.save()
       res.status(201).json(newcardfidele)
       
   } catch (err) {
       res.status(400).json({ message: err.message })
       
   }


})
//updating promocode
router.patch('/:id' , getcardfidele , async (req, res) => {
   if (req.body.pin != null) {
       res.cardfideles.pin = req.body.pin
   }
   
   if (req.body.reduction != null) {
       res.cardfideles.reduction = req.body.reduction
   }

   try {
       const updatedcardfidele = await res.cardfideles.save()
       res.json(updatedcardfidele)

   } catch (err) {
       res.status(400).json({ message: err.message })
       
   }

})
//Deleting product
router.delete('/:id' , getcardfidele , async (req, res) => {
   try {

       await res.cardfideles.remove()
       res.json({ message: 'Deleted Succesfully' })
   } catch (err) {
       res.status(500).json({ message: err.message })
       
   }


})


async function getcardfidele(req, res, next) {

   let cardfideles

   try {
    cardfideles = await cardfidele.findById(req.params.id)
       if (cardfideles == null) {
           return res.status(404).json({ message: 'Cannot find category'})
       }
   } catch (err) {
       
       return res.status(500).json({ message: err.message })
   }

   res.cardfideles = cardfideles
   next()
}

module.exports = router