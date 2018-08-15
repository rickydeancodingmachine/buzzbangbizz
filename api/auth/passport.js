const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const getUser = require('../database/controllers/user').get;

module.exports = passport => {
  console.log('in passport module');
  console.log('secretOrKey:', process.env.SECRET_OR_KEY);
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET_OR_KEY;
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      console.log('in passport.use');
      console.log('payload:', jwt_payload);
      getUser({ id: jwt_payload.id })
        .then(user => {
          if (user) {
            console.log('is user!');
            done(null, user.dataValues.id);
            // return null;
          } else {
            console.log('is NOT user');
            done(null, false);
            // return null;
          }
        })
        .catch(error => {
          console.log('error: ', error);
          done(err, false);
        });
    }),
  );
};
