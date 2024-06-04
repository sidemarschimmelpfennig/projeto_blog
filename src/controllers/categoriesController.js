const slugify = require('slugify')
const {Category} = require('../models')
const router = require('express').Router()
const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/categories/new',adminAuth,(req ,res)=>{
    res.render('admin/categories/new')
})

router.get('/admin/categories',adminAuth,(req,res)=>{
    Category.findAll()
    .then(categories => res.render('admin/categories/index', {categories : categories}) )
})

router.post('/categories/save', (req, res)=>{
    var title = req.body.title
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/admin/categories')
        })
    }else{
        res.redirect('/admin/categories/new')
    }
})

router.post('/categories/delete', (req, res)=>{
    var id = req.body.id
    if( id != undefined ){
        if(!isNaN(id)){
            Category.destroy({
                where : {
                    id : id
                }
            }).then(()=>{
                res.redirect('/admin/categories')
            })
        }else{ // Não é numero
            res.redirect('/admin/categories')
        }
    }else{ // Null 
        res.redirect('/admin/categories')
    }
})

// Busca todos os 
router.get('/admin/categories/edit/:id', adminAuth, (req, res)=>{
    let id = req.params.id
    Category.findByPk(id)
    .then(category=>{
        if(category != undefined){
            res.render('admin/categories/edit', {category : category})
        }else{
            res.redirect('/admin/categories')
        }
    })
    .catch(err=>{
        res.redirect('/admin/categories')
    })
})

router.post("/categories/update/", (req, res)=>{
    let title = req.body.title
    let id = req.body.id

        Category.update({
            title: title,
            slug: slugify(title)
        } , 
        {
            where : {
                id : id
            }
        }
        ).then(()=>{
            res.redirect(`/admin/categories`)
        })
        .catch( ()=>{
            res.redirect(`/admin/categories/edit/${id}`)
        })
})

module.exports = router;