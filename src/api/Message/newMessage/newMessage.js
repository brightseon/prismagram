import { prisma } from '../../../../generated/prisma-client';

export default {
    Subscription : {
        newMessage : {
            subscribe : (_, args) => {
                const { roomId } = args;

                return prisma.$subscribe.message({
                    AND : [
                        { mutation_in : 'CREATED' },
                        {
                            node : {
                                room : { id : roomId }
                            }
                        }
                    ]
                }).node();
            },
            // #3-28. newMessage Subscription part Two 참고
            resolve : payload => payload
        }
    }
};