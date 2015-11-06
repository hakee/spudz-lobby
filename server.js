var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    morgan      = require('morgan'), //log requests in console
    bodyParser  = require('body-parser')
    methodOvr   = require('method-override'); 

var config      = require('./config'); //configurations

require('./routes')(app); //routes

mongoose.connect('mongodb://localhost:27017/spudz-dev');

app.use(express.static(config.publicPath));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse \application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOvr());

app.get('*', function (req, res) {
    res.sendfile(config.publicPath + '/index.html');
});

app.listen(config.http.port);
console.log('App listening on ' + config.http.port);