const router = require('express').Router()


router.get('/articles', (req, res)=>{
    res.send('ROTA DE GATEGORIAS')
})

router.get( "/admin/articles/new", (req, res) =>{
    res.send('ROTA PARA CRIAR UMA NOVA CATEGORIA')
})



module.exports = router;