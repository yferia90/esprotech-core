import { connect } from 'mongoose';
import { getUrlDB } from '../utils/util.util';
import logger from '../utils/logger.utils';

const URLDB = getUrlDB();

const connectDataBase = async () => {
    try{
        await connect(URLDB);
        return true;
    }catch(err){
        logger.info(err);
        return false;
    }
}

export default connectDataBase;