import { Schema, model } from 'mongoose';
import { SpendCalculatedInterface } from '../types/spend.calculated.type';

const SpendCalculatedSchema = new Schema(
    {
        monto: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)
const SpendCalculatedModel = model<SpendCalculatedInterface>("spendcalculated", SpendCalculatedSchema);

export default SpendCalculatedModel;