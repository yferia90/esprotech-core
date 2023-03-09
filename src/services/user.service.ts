import UserModel from "../models/user.schema";
import { UserInterface } from "../types/user.type";

/**
 * Paginate users
 * @returns 
 */
const getUsers = async (limit: number, page: number) => {
    try{
        const findUsers = await UserModel.paginate({}, {limit, page});
        return findUsers;
    }catch(err){
        return "Internal server error";
    }
}

/**
 * Registrar usuarios
 * @param user 
 * @returns 
 */
const registerUser = async (body: UserInterface) => {
    try{
        const user: UserInterface = new UserModel({
            username: body.username,
            email: body.email,
            password: body.password
        });
        user.password = await user.encryptPassword(user.password);
        const userSave = await UserModel.create(user);
        return userSave._id;
    }catch(err){
        return "Internal server error";
    }
}

/**
 * Detalles de un ususario dado el email
 * @param email
 * @returns 
 */
const getUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email });
    return user;
}

const getUserById = async (id: string) => {
    const user = await UserModel.findById({_id: id});
    return user;
}

/**
 * Description: Siembra de usuarios
 * @param users 
 * @returns 
 */
const bulkUsersDB = async (users: Array<Object>) => {
    try{
        let bulkInsert = UserModel.collection.initializeOrderedBulkOp();
        users && users.map(async item => {
            await bulkInsert.insert(item);
        });
        const insertBulkUsers = await bulkInsert.execute();
        return insertBulkUsers;
    }catch(err){
        return err;
    }
}

const apiDeleteUser = async (id: string) => {
    const user = await UserModel.deleteOne({_id: id});
    return user;
}

export {
    getUsers,
    registerUser,
    getUserByEmail,
    getUserById,
    bulkUsersDB,
    apiDeleteUser,
}