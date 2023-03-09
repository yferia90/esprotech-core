import mongoose, { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { SavingInterface } from '../types/saving.type';

const SavingSchema = new Schema(
    {
        monto: {
            type: String,
            required: true
        },
        type_operation: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: false
        },
        user_id: {
            type: String,
            required: false
        },
        profile: {
            type: String,
            required: false
        }
    }, {
        timestamps: true
    }
)

// Incluyendo el plugin de paginado al schema de contacto
SavingSchema.plugin(mongoosePaginate);

const SavingModel = model<SavingInterface, mongoose.PaginateModel<SavingInterface>>("saving", SavingSchema);

export default SavingModel;