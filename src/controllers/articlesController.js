const router = require('express').Router()
const slugify = require('slugify')
const {Article, Category} = require('../models')

router.get('/admin/articles', (req, res)=>{
    Article.findAll({
        include:[{model : Category}]
    })
    .then(articles =>{
            res.render('admin/articles/index', {articles : articles} )
    })
    .catch(error =>{
        res.redirect('/')
    })
    
})

router.get( "/admin/articles/new", (req, res) =>{
    Category.findAll().then(categories =>{
        res.render('admin/articles/new',{categories : categories})
    })   
})

router.post('/articles/save', (req , res)=>{
    const title = req.body.title
    const body = req.body.body
    const category = req.body.category

    Article.create({
        title : title,
        slug : slugify(title),
        body: body,
        categoryId : category
     }).then(()=>{
        res.redirect("/admin/articles")
     }).catch( () =>{
        res.redirect('/admin/articles/new')
     })
})

router.post('/articles/delete', (req, res)=>{
    var id = req.body.id
    if( id != undefined ){
        if(!isNaN(id)){
            Article.destroy({
                where : {
                    id : id
                }
            }).then(()=>{
                res.redirect('/admin/articles')
            })
        }else{ // Não é numero
            res.redirect('/admin/articles')
        }
    }else{ // Null 
        res.redirect('/admin/articles')
    }
})

module.exports = router;