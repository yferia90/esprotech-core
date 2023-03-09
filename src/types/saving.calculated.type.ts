import { Document } from 'mongoose';

export interface SavingCalculatedInterface extends Document {
    monto: number,
}