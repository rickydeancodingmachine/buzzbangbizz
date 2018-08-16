const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const getUser = require('../database/controllers/user').get;

module.exports = passport => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET_OR_KEY;
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      getUser({ id: jwt_payload.id })
        .then(user => {
          if (user) {
            done(null, user.dataValues.id);
          } else {
            done(null, false);
          }
        })
        .catch(error => {
          console.log('error: ', error);
          done(err, false);
        });
    }),
  );
};
