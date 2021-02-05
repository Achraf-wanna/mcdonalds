const express = require('express')
const router = express.Router()
const subcategory = require('../models/subcategory')


//all subcategories
router.get('/' , async (req, res) => {
    try {
       const subcategories = await subcategory.find()
       res.json(subcategories)
   } catch (err) {
       
       res.status(500).json({ message: err.message })
   }
})
//one subcategories
router.get('/:id' , getsubcategory , (req, res) => {
   res.json(res.subcategories)
})
//creating subcategory
router.post('/', async (req, res) => {
   const subcategories = new subcategory({
       name: req.body.name,
       img: req.body.img,
       catid: req.body.catid
   })
   try {
       const newsubcategory = await subcategories.save()
       res.status(201).json(newsubcategory)
       
   } catch (err) {
       res.status(400).json({ message: err.message })
       
   }


})
//updating subcategory
router.patch('/:id' , getsubcategory , async (req, res) => {
   if (req.body.name != null) {
       res.subcategories.name = req.body.name
   }
   
   if (req.body.img != null) {
       res.subcategories.img = req.body.img
   }

   if (req.body.catid != null) {
    res.subcategories.catid = req.body.catid
}

   try {
       const updatedsubcategory = await res.subcategories.save()
       res.json(updatedsubcategory)

   } catch (err) {
       res.status(400).json({ message: err.message })
       
   }

})
//Deleting subcategory
router.delete('/:id' , getsubcategory , async (req, res) => {
   try {

       await res.subcategories.remove()
       res.json({ message: 'Deleted Succesfully' })
   } catch (err) {
       res.status(500).json({ message: err.message })
       
   }


})


async function getsubcategory(req, res, next) {

   let subcategories

   try {
       subcategories = await subcategory.findById(req.params.id)
       if (subcategories == null) {
           return res.status(404).json({ message: 'Cannot find category'})
       }
   } catch (err) {
       
       return res.status(500).json({ message: err.message })
   }

   res.subcategories = subcategories
   next()
}

module.exports = router