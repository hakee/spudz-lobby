module.exports = function(passport, request) {
  passport.use(new FacebookStrategy({
      clientID: config.facebookLogin.clientID,
      clientSecret: config.facebookLogin.clientSecret,
      callbackURL: "http://localhost:8000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        return done(null, profile);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    request('http://localhost:8000/api/player/'+user.id, function(err, res, body) {
      // Create it only if it doesn't already exist
      if(!body) {
        request.post('http://localhost:8000/api/player',
                    {json: {uid: user.id,
                            firstName: user.displayName.split(' ')[0],
                            lastName: user.displayName.split(' ')[1] }});
        done(null, user.id);
      } else {
        done(null, JSON.parse(body).uid);
      }
    });
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });
}
