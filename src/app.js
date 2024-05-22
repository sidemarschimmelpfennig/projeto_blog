// Import libs ---------
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

// Imports files --------
const routes = require('./routes');
const connection = require('./database/database');

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Database 
connection
.authenticate()
.then(()=>{
    console.log(' Conexão ao banco de dados efetuada com sucesso !! ');
})
.catch((error)=>{
    console.log(error);
})

// Middlewares
app.use(cors());
app.use(helmet());

// Routes
app.use(routes);


module.exports = app; 