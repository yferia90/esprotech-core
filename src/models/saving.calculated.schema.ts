import { Schema, model } from 'mongoose';
import { SpendCalculatedInterface } from '../types/spend.calculated.type';

const SavingCalculatedSchema = new Schema(
    {
        monto: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)
const SavingCalculatedModel = model<SpendCalculatedInterface>("savingcalculated", SavingCalculatedSchema);

export default SavingCalculatedModel;