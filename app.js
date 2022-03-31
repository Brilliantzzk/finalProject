var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminsRouter = require('./routes/admins');
var usersRouter = require('./routes/users');
var deviceRouter = require('./routes/device')
var dataRouter = require('./routes/data')
var topicRouter = require('./routes/topic')
var logRouter = require('./routes/log')

var app = express();

//传递头信息application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//传递头信息
app.use(bodyParser.json());

//改写
var http = require('http');
var server = http.createServer(app);

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
app.use('/ad',adminsRouter);
app.use('/user',usersRouter);
app.use('/api',deviceRouter);
app.use('/api',dataRouter);
app.use('/api',topicRouter);
app.use('/api',logRouter);



server.listen('3000')