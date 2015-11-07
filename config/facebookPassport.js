module.exports = function(passport, request, Account) {
  passport.use(new FacebookStrategy({
      clientID: config.facebookLogin.clientID,
      clientSecret: config.facebookLogin.clientSecret,
      callbackURL: "http://localhost:8000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      process.nextTick(function() {
        Account.findOne({ 'uid' : profile.id }, function(err, account) {
          if(err) return done(err);
          if(account) {
            done(null, account);
          } else {
            var newUser   = new User();
            newUser.uid       = profile.id;
            newUser.token     = token;
            newUser.firstName = profile.displayName.split(' ')[0];
            newUser.lastName  = profile.displayName.split(' ')[1];

            newUser.save(function(err) {
              if(err) throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });
}
