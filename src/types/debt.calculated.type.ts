import { Document } from 'mongoose';

export interface DebtCalculatedInterface extends Document {
    monto: number,
}