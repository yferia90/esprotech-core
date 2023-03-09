import mongoose, { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { DebtInterface } from '../types/debt.type';

const DebtSchema = new Schema(
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

// Incluyendo el plugin de paginado al schema de contacto
DebtSchema.plugin(mongoosePaginate);

const DebtModel = model<DebtInterface, mongoose.PaginateModel<DebtInterface>>("debt", DebtSchema);

export default DebtModel;