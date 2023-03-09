import { Schema, model } from 'mongoose';
import { DebtCalculatedInterface } from '../types/debt.calculated.type';

const DebtCalculatedSchema = new Schema(
    {
        monto: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)
const DebtCalculatedModel = model<DebtCalculatedInterface>("debtcalculated", DebtCalculatedSchema);

export default DebtCalculatedModel;