const express = require('express')
const router = express.Router()
const subcategory = require('../models/subcategory')
const logs = require('../models/logs');
const log = require('../log');


//all subcategories
router.get('/' , async (req, res) => {
    try {
       const subcategories = await subcategory.find()
       res.json(subcategories)
       log({
        file: 'subcategory.js',
        line: '12',
        info: 'Get all subcategories',
        type: 'info'
    }, logs);
   } catch (err) {
       
       res.status(500).json({ message: err.message })
       log({
        file: 'subcategory.js',
        line: '21',
        info: err,
        type: 'Critical'
    }, logs);
   }
})
//one subcategories
router.get('/:id' , getsubcategory , (req, res) => {
   res.json(res.subcategories)
})

//search subCategory By category id

router.get('/findsubCatByCatId/:catid', async (req,res) => {
    try{
        const subcategories = await subcategory.find({}).where('catid').equals(req.params.catid)
        res.send(subcategories)
        log({
            file: 'subcategory.js',
            line: '40',
            info: 'Get subcategory by category id',
            type: 'info'
        }, logs);
       
    } catch (err) {
        res.status(500).json({ message: err.message})
        log({
            file: 'subcategory.js',
            line: '49',
            info: err,
            type: 'Critical'
        }, logs);
       
    }
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
       log({
        file: 'subcategory.js',
        line: '69',
        info: 'Post subcategory',
        type: 'info'
    }, logs);
       
   } catch (err) {
       res.status(400).json({ message: err.message })
       log({
        file: 'subcategory.js',
        line: '78',
        info: err,
        type: 'Critical'
    }, logs);
       
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
       log({
        file: 'subcategory.js',
        line: '106',
        info: 'Patch  subcategory',
        type: 'info'
    }, logs);

   } catch (err) {
       res.status(400).json({ message: err.message })
       log({
        file: 'subcategory.js',
        line: '115',
        info: err,
        type: 'Critical'
    }, logs);
       
   }

})
//Deleting subcategory
router.delete('/:id' , getsubcategory , async (req, res) => {
   try {

       await res.subcategories.remove()
       res.json({ message: 'Deleted Succesfully' })
       log({
        file: 'subcategory.js',
        line: '131',
        info: 'Delete subcategory',
        type: 'info'
    }, logs);
   } catch (err) {
       res.status(500).json({ message: err.message })
       log({
        file: 'subcategory.js',
        line: '139',
        info: err,
        type: 'Critical'
    }, logs);
       
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