import { Schema, model } from 'mongoose';
import { InvestmentCalculatedInterface } from '../types/investment.calculated.type';

const InvestmentCalculatedSchema = new Schema(
    {
        monto: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)
const InvestmentCalculatedModel = model<InvestmentCalculatedInterface>("investmentcalculated", InvestmentCalculatedSchema);

export default InvestmentCalculatedModel;