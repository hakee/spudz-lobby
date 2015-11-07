var express           = require('express'),
    app               = express(),
    mongoose          = require('mongoose'),
    morgan            = require('morgan'),
    bodyParser        = require('body-parser')
    methodOvr         = require('method-override'),
    request           = require('request'),
    passport          = require('passport'),
    FacebookStrategy  = require('passport-facebook').Strategy,
    config            = require('./config'),
    routes            = require('./routes/index');

// Init facebook passport
require('./config/initializers/facebookPassport')(passport, request);

mongoose.connect('mongodb://localhost:27017/spudz-dev');

app.use(express.static(config.publicPath));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse \application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOvr());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login'}));

app.listen(config.http.port);
console.log('App listening on ' + config.http.port);
