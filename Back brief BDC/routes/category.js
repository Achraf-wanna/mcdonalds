const express = require('express')
const router = express.Router()
const category = require('../models/category')

//all categories
router.get('/' , async (req, res) => {
     try {
        const categories = await category.find()
        res.json(categories)
    } catch (err) {
        
        res.status(500).json({ message: err.message })
    }
})
//one categories
router.get('/:id' , getcategory , (req, res) => {
    res.json(res.categories)
})
//creating category
router.post('/', async (req, res) => {
    const categories = new category({
        name: req.body.name,
        img: req.body.img
    })
    try {
        const newcategory = await categories.save()
        res.status(201).json(newcategory)
        
    } catch (err) {
        res.status(400).json({ message: err.message })
        
    }


})
//updating category
router.patch('/:id' , getcategory , async (req, res) => {
    if (req.body.name != null) {
        res.categories.name = req.body.name
    }
    
    if (req.body.img != null) {
        res.categories.img = req.body.img
    }

    try {
        const updatedcategory = await res.categories.save()
        res.json(updatedcategory)

    } catch (err) {
        res.status(400).json({ message: err.message })
        
    }

})
//Deleting category
router.delete('/:id' , getcategory , async (req, res) => {
    try {

        await res.categories.remove()
        res.json({ message: 'Deleted Succesfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
        
    }


})


async function getcategory(req, res, next) {

    let categories

    try {
        categories = await category.findById(req.params.id)
        if (categories == null) {
            return res.status(404).json({ message: 'Cannot find category'})
        }
    } catch (err) {
        
        return res.status(500).json({ message: err.message })
    }

    res.categories = categories
    next()
}

module.exports = router