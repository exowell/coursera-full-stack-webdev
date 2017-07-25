var express = require('express');
var morgan = require('morgan');
var dishRouter = require('./router/dishRouter');
var promoRouter = require('./router/promoRouter');
var leaderRouter = require('./router/leaderRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
