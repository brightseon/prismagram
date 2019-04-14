import { prisma } from '../../../../generated/prisma-client';
import { USER_FRAGMENT } from '../../../fragments';

export default {
    Query : {
        seeUser : async (_, args) => {
            const { id } = args;

            return prisma.user({ id }).$fragment(USER_FRAGMENT);
        }
    }
};