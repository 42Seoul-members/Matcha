import passport from 'passport';
import * as jwtPassport from 'passport-jwt';
import * as dbService from './db.service';

const JwtStrategy = jwtPassport.Strategy;
const ExtractJwt = jwtPassport.ExtractJwt;

const opts: jwtPassport.StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: `${process.env.JWT_SECRET}`,
};

export const jwtStrategyInstance = new JwtStrategy(
  opts,
  async (jwtPayload, done) => {
    console.log('entered');
    try {
      const serverSideToken = await dbService.findRefreshTokenByUid(
        jwtPayload.userId
      );

      console.log(
        `comparing serverside and payload,\nserver: ${serverSideToken}\npayload: ${
          jwtPayload.refreshToken
        }\nresult: ${serverSideToken === jwtPayload.refreshToken}`
      );

      if (
        serverSideToken.length === 0 ||
        serverSideToken[0].refresh_token !== jwtPayload.refreshToken
      ) {
        return done(null, false);
      }

      return done(null, jwtPayload.refreshToken);
    } catch (err) {
      return done(err, false);
    }
  }
);
