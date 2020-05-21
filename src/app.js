const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const cors = require('cors');
const fs = require('fs')
const app = express();


// settings
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}))

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //para formularios html
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;