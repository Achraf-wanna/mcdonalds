const express = require('express')
const router = express.Router()
const category = require('../models/category')
const logs = require('../models/logs');
const log = require('../log');

//all categories
router.get('/' , async (req, res) => {
     try {
        const categories = await category.find()
        res.json(categories)
        log({
            file: 'category.js',
            line: '9',
            info: 'Get all Categories',
            type: 'info'
        }, logs);
    } catch (err) {
        
        res.status(500).json({ message: err.message })
        log({
            file: 'category.js',
            line: '18',
            info: err,
            type: 'Critical'
        }, logs);
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
        log({
            file: 'category.js',
            line: '39',
            info: 'Post category',
            type: 'info'
        }, logs);
        
    } catch (err) {
        res.status(400).json({ message: err.message })
        log({
            file: 'category.js',
            line: '48',
            info: err,
            type: 'Critical'
        }, logs);
        
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
        log({
            file: 'category.js',
            line: '72',
            info: 'Patch one category',
            type: 'info'
        }, logs);

    } catch (err) {
        res.status(400).json({ message: err.message })
        log({
            file: 'category.js',
            line: '81',
            info: err,
            type: 'Critical'
        }, logs);
        
    }

})
//Deleting category
router.delete('/:id' , getcategory , async (req, res) => {
    try {

        await res.categories.remove()
        res.json({ message: 'Deleted Succesfully' })
        log({
            file: 'category.js',
            line: '12',
            info: 'Delete one category',
            type: 'info'
        }, logs);
    } catch (err) {
        res.status(500).json({ message: err.message })
        log({
            file: 'category.js',
            line: '12',
            info: err,
            type: 'Critical'
        }, logs);
        
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