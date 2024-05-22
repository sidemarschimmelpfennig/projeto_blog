const routes = require('express').Router()

// Imports from domains
const categories = require('./dCategories/categoriesController')

routes.use(categories)

routes.get('/', (req, res)=>{
    res.render('index')
})

module.exports = routes