const routes = require('express').Router()
const {articlesController, categoriesController , homeCategory, usersController} = require('./controllers')

routes.use(usersController) // users routes off login 
routes.use(homeCategory) // home routes  
routes.use(articlesController) // 
routes.use(categoriesController)



module.exports = routes