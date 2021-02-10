const express = require('express')
const router = express.Router()
const extra = require('../models/extra')
const logs = require('../models/logs');
const log = require('../log');


//all extras
router.get('/' , async (req, res) => {
    try {
       const extras = await extra.find()
       res.json(extras)
       log({
        file: 'extra.js',
        line: '12',
        info: 'Get all ingrediants',
        type: 'info'
    }, logs);
   } catch (err) {
       
       res.status(500).json({ message: err.message })
       log({
        file: 'extra.js',
        line: '21',
        info: err,
        type: 'Critical'
    }, logs);
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
       price: req.body.price
      
   })
   try {
       const newextra = await extras.save()
       res.status(201).json(newextra)
       res.json(extras)
       log({
        file: 'extra.js',
        line: '43',
        info: 'Post ingrediant',
        type: 'info'
    }, logs);
       
   } catch (err) {
       res.status(400).json({ message: err.message })
       res.json(extras)
       log({
        file: 'extra.js',
        line: '53',
        info: err,
        type: 'Critical'
    }, logs);
       
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

   try {
       const updatedextra = await res.extras.save()
       res.json(updatedextra)
       res.json(extras)
       log({
        file: 'extra.js',
        line: '78',
        info: 'Patch ingrediant',
        type: 'info'
    }, logs);

   } catch (err) {
       res.status(400).json({ message: err.message })
       res.json(extras)
       log({
        file: 'extra.js',
        line: '88',
        info: err,
        type: 'Critical'
    }, logs);
       
   }

})
//Deleting extra
router.delete('/:id' , getextra , async (req, res) => {
   try {

       await res.extras.remove()
       res.json({ message: 'Deleted Succesfully' })
       res.json(extras)
       log({
        file: 'extra.js',
        line: '105',
        info: 'Delete ingrediant',
        type: 'info'
    }, logs);
   } catch (err) {
       res.status(500).json({ message: err.message })
       res.json(extras)
       log({
        file: 'extra.js',
        line: '114',
        info: err,
        type: 'Critical'
    }, logs);
       
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