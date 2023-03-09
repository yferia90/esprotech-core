import { Document } from 'mongoose';

export interface SpendCalculatedInterface extends Document {
    monto: number,
}