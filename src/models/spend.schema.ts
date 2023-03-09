import mongoose, { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { SpendInterface } from '../types/spend.type';

const SpendSchema = new Schema(
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
        }
    }, {
        timestamps: true
    }
)

// Incluyendo el plugin de paginado al schema
SpendSchema.plugin(mongoosePaginate);

const SpendModel = model<SpendInterface, mongoose.PaginateModel<SpendInterface>>("spend", SpendSchema);

export default SpendModel;