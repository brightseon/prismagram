import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path : path.resolve(__dirname, '.env') });

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

passport.use(new Strategy(jwtOptions, verifyUser));