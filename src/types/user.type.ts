import { Document } from 'mongoose';
import { PaginationModel } from './pagination.type';

export interface UserInterface extends Document {
    username: string,
    email: string,
    password: string,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>,
    pagination: PaginationModel,
}

export interface PayloadInterface extends Document {
    _id: string,
    iat: number,
    exp: number
}

export interface QueryData {
    limit: string,
    page: string
};