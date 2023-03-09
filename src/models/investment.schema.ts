import mongoose, { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { InvestmentInterface } from '../types/investment.type';

const InvestmentSchema = new Schema(
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

// Incluyendo el plugin de paginado al schema de inversiones
InvestmentSchema.plugin(mongoosePaginate);

const InvestmentModel = model<InvestmentInterface, mongoose.PaginateModel<InvestmentInterface>>("investment", InvestmentSchema);

export default InvestmentModel;