const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('./Category')

const Article = connection.define('article', {
    title : {
        type : Sequelize.STRING,
        allowNull : false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type : Sequelize.STRING,
        allowNull : false
    }
})

Category.hasMany(Article) ;  // Tem muitos 
Article.belongsTo(Category); // um pertence a uma categoria


module.exports = Article