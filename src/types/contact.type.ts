import { Document } from 'mongoose';
import { PaginationModel } from './pagination.type';

export interface ContactInterface extends Document {
    name: string,
    email: string,
    mensaje: string,
    celular: string,
    pagination: PaginationModel,
}