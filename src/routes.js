const routes = require('express').Router()
const {articlesController, categoriesController} = require('./controllers')


routes.get('/', (req, res)=>{
    res.render('index')
})

routes.use(articlesController)
routes.use(categoriesController)

module.exports = routes