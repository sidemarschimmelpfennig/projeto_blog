const routes = require('express').Router()
const {articlesController, categoriesController , homeCategory, usersController} = require('./controllers')

routes.get("/session", (req, res)=>{
    req.session.treinamento = "Formação nodeJs"
    req.session.ano = 2019
    req.session.email = "teste@teste.com"
    req.session.user = {
        username: "teste",
        email : "teste@teste.com",
        id : 1
    }
    res.send("sessao gerada")
})

routes.get("/reader", (req, res)=>{
    res.json({
        treinamento : req.session.treinamento,
        user : req.session.user
    })
})

routes.use(usersController) // users routes off login 
routes.use(homeCategory) // home routes  
routes.use(articlesController) // 
routes.use(categoriesController)



module.exports = routes