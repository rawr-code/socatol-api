const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const config = require("../config");

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
};

const { User } = require("../models/User");

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password"
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username: username }).exec();
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) done(null, user);
          else done("Usuario o contraseña incorecto!");
        } catch (err) {
          done(err);
        }
      }
    )
  );
  passport.use(
    new JWTStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) done(null, user);
        else done(null, false);
      } catch (err) {
        return done(err);
      }
    })
  );
};
