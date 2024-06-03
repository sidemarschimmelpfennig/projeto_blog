const router = require('express').Router()
const slugify = require('slugify')
const {Article, Category} = require('../models')



//Index View

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

//Create View
router.get( "/admin/articles/new", (req, res) =>{
    Category.findAll().then(categories =>{
        res.render('admin/articles/new',{categories : categories})
    })   
})

//Edit view 
router.get('/admin/articles/edit/:id', (req, res)=>{
    let id = req.params.id
    Article.findByPk(id)
    .then(article =>{
        if(article != undefined){
            Category.findAll().then(categories=>{
                if(categories !== undefined){
                    res.render('admin/articles/edit', {article : article, categories : categories })
                }else{
                    res.redirect('/admin/articles')
                }
            })
            
        }else{
            res.redirect('/admin/articles')
        }
    })
    .catch(err=>{
        res.redirect('/admin/articles')
    })
})

router.get("/articles/page/:num?", (req, res)=>{
    var page = req.params.num 
    var offset = 0;

    if(isNaN(page) || page == 1){
        offset = 0;
    } else {
        offset = (parseInt(page) -1) * 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset, 
        order:[
            ['id', 'DESC']
        ]
    }).then(articles=>{
        let next;
        if(offset + 4 >= articles.count){
            next = false;
        } else {
            next = true;
        }
        let result = {
            page : parseInt(page),
            next : next,
            articles : articles
        }
        Category.findAll()
        .then(categories=>{
            res.render("admin/articles/page", {result : result, categories: categories})
        });
    });
});



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


router.post("/articles/update", (req, res)=>{
    let id = req.body.id
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category

        Article.update({
            title: title,
            slug: slugify(title),
            body : body,
            categoryId : category
        } , 
        {
            where : {
                id : id
            }
        }
        ).then(()=>{
            res.redirect(`/admin/articles`)
        })
        .catch( ()=>{
            res.redirect(`/admin/articles/edit/${id}`)
        })
})


module.exports = router;