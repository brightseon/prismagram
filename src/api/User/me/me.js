import { prisma } from '../../../../generated/prisma-client';

export default {
    Query : {
        me : async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);

            const { user } = request;

            const userProfile = await prisma.user({ id : user.id });
            const posts = await prisma.user({ id : user.id }).posts();

            return {
                user : userProfile,
                posts
            };
        }
    },
    // Custom Resolver
    // 하나의 field만을 위한 것.
    // 다른 field들에게 영향이 가지 않는다.
    // Prisma에서 먼저 찾고, 찾을 수 없다면 내 서버에서 찾는다.
    User : {
        // #3-14 Computed Fields in Prisma 참고
        fullName : (parent) => {
            return `${ parent.firstName } ${ parent.lastName }`;
        }
    }
};