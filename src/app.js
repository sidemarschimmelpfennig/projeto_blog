// Import libs ---------
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')
const app = express();

const { Category, Article, User } = require('./models')

// Middlewares
app.use(cors());
app.use(helmet());

// Redis 
app.use(session({
    secret: process.env.SECRET, cookie: {maxAge: 30000000} 
}))

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Imports files --------
const routes = require('./routes');
const connection = require('./database/database');

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static
app.use(express.static('public'));


// Database 
connection
.authenticate()
.then(()=>{
    console.log(' Conexão ao banco de dados efetuada com sucesso !! ');
})
.catch((error)=>{
    console.log(error);
})



// Routes
app.use(routes);


module.exports = app; 