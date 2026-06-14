const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SecretOrKey
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload._id).select("-password");

            if (!user) return done(null, false);

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);

module.exports = () => passport.authenticate("jwt", { session: false });