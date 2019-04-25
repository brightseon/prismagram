import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation : {
        editUser : async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);

            const { username, email, firstName, lastName, bio, avatar } = args;
            const { user } = request;

            // return이 마지막 statement여서 서버는 자동으로 브라우저에게 
            // 결과를 전달하는 것을 기다려 주기 때문에 await를 쓰지 않아도 된다.
            return prisma.updateUser({
                where : {
                    id : user.id
                },
                data : {
                    username,
                    email,
                    firstName,
                    lastName,
                    bio,
                    avatar
                }
            });
        }
    }
};