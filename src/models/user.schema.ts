import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import mongoosePaginate from 'mongoose-paginate-v2';

import { UserInterface } from '../types/user.type';

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },{
        timestamps: true
    }
)

// Encriptado de la contraseña del usuario
UserSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

// Validando que la contraseña sea la correcta.
// UserSchema.methods.validatePassword = function (password: string): Boolean {
//     return bcrypt.compare(password, this.password);
// }

// Incluyendo el plugin de paginado al schema de usuario
UserSchema.plugin(mongoosePaginate);

const UserModel = model<UserInterface, mongoose.PaginateModel<UserInterface>>("users", UserSchema);

export default UserModel;