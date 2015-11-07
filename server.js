var express           = require('express'),
    app               = express(),
    mongoose          = require('mongoose'),
    morgan            = require('morgan'),
    bodyParser        = require('body-parser')
    methodOvr         = require('method-override'),
    config            = require('./config');
    jwt               = require('jsonwebtoken'),
    Account           = require('./models/account');
    router            = require('express').Router();

// Connect to DB
mongoose.connect(config.dbPath);

app.use(express.static(config.publicPath));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse \application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOvr());

app.get('/', function (req, res) {
    res.sendfile(config.publicPath + '/index.html');
});

app.set('secret', config.secret);

app.post('/register', function(req, res) {
  var account = new Account(req.body);
  account.save(function(err) {
    if(err) { return res.send(err); }
    return res.send({success: true});
  });
});

router.post('/login', function(req, res) {
  Account.findOne({
    name: req.body.name
  }, function(err, account) {
    if(err) { throw err; }
    if(!account) {
      res.json({ success: false, message: 'Authentication failed. Account not found' });
    } else {
      if(account.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password' });
      } else {
        var token = jwt.sign(account, app.get('secret'), {
          expiresInMinutes: 1440
        });

        res.json({
          success: true,
          token: token
        });
      }
    }
  });
});

router.use(function(req, res, next) {
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, app.get('secret'), function(err, decoded) {
      if(err) {
        return res.json({ success: false, message: 'Failed to auth token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
});

router.get('/logout', function(req, res) {
});

app.use('/api', router);

app.listen(config.http.port);
