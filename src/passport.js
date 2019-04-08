import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path : path.resolve(__dirname, '.env') });

import passport from 'passport';
import JWTStrategy from 'passport-jwt';

const jwtOptions = {
    // authorization header에서 jwt를 찾는 역할을 한다.
    jwtFromRequest : JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret : process.env.JWT_SECRET
};

// done : 사용자를 찾았을 때 호출해야 하는 함수
const verifyUser = (payload, done) => {
    
};

passport.use(new JWTStrategy(jwtOptions, verifyUser));