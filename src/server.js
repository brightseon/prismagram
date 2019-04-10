import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';

const PORT = process.env.PORT || 4000; 

// context : 모든 resolver에 정보를 공유할 때 사용
// context에는 함수를 담을 수도 있다.
const server = new GraphQLServer({
    schema,
    // context의 parameter인 req는 passport에 입력되는 req 객체와는 다르다.
    // context의 req 객체에 담기는 정보 중 하나가 passport의 req 객체와 같다.
    context : ({ request }) => ({ request })
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({ port : PORT }, () => console.log(`✅   Server running on port http://localhost:${ PORT }`));