const { Sequelize } = require("sequelize")

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql',   
    timezone: '-03:00',
    port: process.env.DB_PORT
} )


module.exports = connection