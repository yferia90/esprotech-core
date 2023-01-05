import logger from '../utils/logger.utils';
import { encryptPass } from '../utils/util.util';
import usersData from './user.data';
import connectDataBase from '../db/mongo';
import { getUserByEmail, bulkUsersDB } from '../services/user.service';

const seedUsers = async () => {
    try{
        const connect = await connectDataBase();
        if(connect){
            let newUsersDataInsert = [];
            for (let index = 0; index < usersData.length; index++) {
                const findUserByEmail = await getUserByEmail(usersData[index].email);
                if(!findUserByEmail){
                    let userData = usersData[index];
                    const bPassword = await encryptPass(userData.password);
                    userData = {...userData, password:bPassword}
                    newUsersDataInsert.push(userData);
                }
            };
            if(newUsersDataInsert.length > 0){
                const saveUsers = await bulkUsersDB(newUsersDataInsert);
                return saveUsers;
            }else {
                return null;
            }
        }else{
            logger.info('No se pudo establecer conexión con la base de datos.');
            return null;
        }
    }catch(err){
        logger.info(err);
        return err;
    }
}

export default seedUsers;