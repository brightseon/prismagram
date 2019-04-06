import { generateSecret } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation : {
        requestSecret : async (_, args) => {
            const { email } = args;
            const loginSecret = generateSecret();

            try {
                await prisma.updateUser({ data : { loginSecret }, where : { email } });

                return true;
            } catch(err) {
                console.log('requestSecret.js prisma.updateUser error : ', err);

                return false;
            }
        }
    }
};