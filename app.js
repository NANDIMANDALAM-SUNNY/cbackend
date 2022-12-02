var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var orderRouter = require('./routes/order');
var categorySales = require('./routes/categorySales');
var countrySales = require('./routes/countrySales');
var websiteTraffic = require('./routes/websiteTraffic');
var OrderTimeline = require('./routes/OrderTimeline');
var seriesSales = require('./routes/seriesSales');
const { mongoose } = require('mongoose');
const { dburl } = require('./DbConnection/dbConnection');
const fileUpload = require('express-fileupload');
require('dotenv').config()








mongoose.connect(dburl, { useNewUrlParser: true,useUnifiedTopology: true}  )
.then(
  (res) =>  {
    console.log(`Database is Connected`)
  },
  err => { console.log(`Not Connected`) }
);



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({
  useTempFiles: true,
  // createParentPath: true,
}))









app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/categorysales', categorySales);
app.use('/countrySales', countrySales);
app.use('/websitetraffic', websiteTraffic);
app.use('/ordertimeline', OrderTimeline);
app.use('/seriessales', seriesSales);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`server is running on the ${PORT}`)
})

module.exports = app;
