import { Document } from 'mongoose';

export interface InvestmentCalculatedInterface extends Document {
    monto: number,
}