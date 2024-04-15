import passport, { Passport } from "passport"
import {Strategy as GoogleStrategy} from 'passport-google-oauth2'

const GOOGLE_CLIENT_ID="92663247459-3vkvl5e1fcai8686c1m4r3r5r5c6ms10.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET="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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true
  },
  function(req, accessToken: string, refreshToken: string, params: any, profile: any, done: Function) {
    
    return done(null, profile);
}));

passport.serializeUser(function(user: Express.User, done) {
  done(null, user);
});

passport.deserializeUser(function(user: any, done: Function){
  done(null, user);
});

export default passport;