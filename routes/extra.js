const express = require('express')
const router = express.Router()
const extra = require('../models/extra')


//all extras
router.get('/' , async (req, res) => {
    try {
       const extras = await extra.find()
       res.json(extras)
   } catch (err) {
       
       res.status(500).json({ message: err.message })
   }
})
//one extra
router.get('/:id' , getextra , (req, res) => {
   res.json(res.extras)
})
//creating extra
router.post('/', async (req, res) => {
   const extras = new extra({
       name: req.body.name,
       price: req.body.price,
       img: req.body.img,
   })
   try {
       const newextra = await extras.save()
       res.status(201).json(newextra)
       
   } catch (err) {
       res.status(400).json({ message: err.message })
       
   }


})
//updating extra
router.patch('/:id' , getextra , async (req, res) => {
   if (req.body.name != null) {
       res.extras.name = req.body.name
   }
   
   if (req.body.price != null) {
       res.extras.price = req.body.price
   }

   if (req.body.img != null) {
    res.extras.img = req.body.img
}


   try {
       const updatedextra = await res.extras.save()
       res.json(updatedextra)

   } catch (err) {
       res.status(400).json({ message: err.message })
       
   }

})
//Deleting extra
router.delete('/:id' , getextra , async (req, res) => {
   try {

       await res.extras.remove()
       res.json({ message: 'Deleted Succesfully' })
   } catch (err) {
       res.status(500).json({ message: err.message })
       
   }


})


async function getextra(req, res, next) {

   let extras

   try {
    extras = await extra.findById(req.params.id)
       if (extras == null) {
           return res.status(404).json({ message: 'Cannot find category'})
       }
   } catch (err) {
       
       return res.status(500).json({ message: err.message })
   }

   res.extras = extras
   next()
}

module.exports = router