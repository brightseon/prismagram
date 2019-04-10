import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../generated/prisma-client';

const jwtOptions = {
    // authorization header에서 jwt를 찾는 역할을 한다.
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
};

// JWT를 가져와 해석하고 확인한다.
// done : 사용자를 찾았을 때 호출해야 하는 함수
const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user({ id : payload.id });

        if(user !== null) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(err) {
        console.log('passport.js verifyUser error : ', err);

        return done(err, false);
    }
};

export const authenticateJwt = (req, res, next) => passport.authenticate('jwt', { session : false }, (errpr, user) => {
    if(user) {
        // verifyUser에서 사용자를 받아온 후, 사용자가 존재하면 그 사용자 정보를 req 객체에 붙여준다.
        req.user = user;
    }

    next();
})(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();