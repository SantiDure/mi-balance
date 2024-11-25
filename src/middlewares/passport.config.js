
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from 'dotenv';
import { JWT_SECRET } from '../config/config.js';
import { userService } from '../service/index.service.js';

config();

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.access_token]),
  secretOrKey: JWT_SECRET, 
};

  
  
 export default (passport) => {
   passport.use(
     new JwtStrategy(opts, async (jwt_payload, done) => {
       try {

         const user = await userService.getUserByIdService({_id:jwt_payload.id});
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
