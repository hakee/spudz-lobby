module.exports = function(passport) {
  passport.use(new FacebookStrategy({
      clientID: config.facebookLogin.clientID,
      clientSecret: config.facebookLogin.clientSecret,
      callbackURL: "http://localhost:8000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        console.log(accessToken, refreshToken, profile);
        return done(null, profile);
      });
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}
