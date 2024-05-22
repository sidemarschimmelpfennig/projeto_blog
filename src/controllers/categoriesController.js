const {Article} = require('../models')
const router = require('express').Router()


router.get('/categories', (req, res)=>{
    res.send('ROTA DE GATEGORIAS')
})

router.get( "/admin/categories/new", (req, res) =>{
    res.send('ROTA PARA CRIAR UMA NOVA CATEGORIA')
})



module.exports = router;