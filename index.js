// Imports libs
require('dotenv').config()
const express = require('express')
const server = express()

// Import App
const app = require('./src/app')
server.use(app)

// Server Start
server.listen(process.env.SERVER_PORT,()=>{
    console.log(`Servidor operante rodando na porta http://localhost:${process.env.SERVER_PORT} `)
})