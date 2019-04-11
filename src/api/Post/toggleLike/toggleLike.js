import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation : {
        toggleLike : async (_, args, { request }) => {
            isAuthenticated(request);
            
            const { postId } = args;
            const { user } = request;

            try {
                const existingLike = await prisma.$exists.like({
                    AND : [
                        {
                            user : {
                                id : user.id
                            }
                        },
                        {
                            post : {
                                id : postId
                            }
                        }
                    ]
                });
    
                if(existingLike) {
                    // TO DO
                } else {
                    // 좋아요가 존재하지 않을 때, 이 사용자가 가지면서 포스터가 가지고 있는 좋아요를 만든다.
                    await prisma.createLike({
                        user : {
                            connect : {
                                id : user.id
                            }
                        },
                        post : {
                            connect : {
                                id : postId
                            }
                        }
                    });
                }

                return true;
            } catch(err) {
                console.log('toggleLike.js existingLike error : ', err);

                return false;
            }
        }
    }
};