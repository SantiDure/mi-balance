
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from 'dotenv';
import { JWT_SECRET } from '../config/config.js';
import { UsersDaoMongoose } from '../models/dao/user.dao.mongoose.js';

config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET, 
};

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await UsersDaoMongoose.readOne(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.error(err);
        return done(err, false);
      }
    })
  );
};
