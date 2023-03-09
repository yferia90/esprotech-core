import { Document } from 'mongoose';
import { PaginationModel } from './pagination.type';

export interface InvestmentInterface extends Document {
    monto: number,
    type_operation: string,
    message: string,
    pagination: PaginationModel,
}