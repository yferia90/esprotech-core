import { Request, Response } from "express";

import { getToken } from '../utils/token.util';
import { registerUser, getUserByEmail, getUsers, apiDeleteUser } from "../services/user.service";
import { ResponseSuccess, ResponseError } from '../utils/response.util';
import { QueryData } from '../types/user.type';

export const listUsers = async ({ query }: Request, res: Response) => {
    try{
        const { limit, page } = query as unknown as QueryData;
        const queryLimit = parseInt(limit) || 10;
        const queryPage = parseInt(page) || 1;
        const listUsers = await getUsers(queryLimit, queryPage);
        ResponseSuccess(res, 200, listUsers);
    }catch(err){
        ResponseError(res, 500, 'Internal server error.');
    }
}

export const signUp = async (req: Request, res: Response) => {
    try{
        const { body } = req;
        const userId = await registerUser(body);
        const token = await getToken(userId);
        ResponseSuccess(res, 201, [], 'User created successfully.', token);
    }catch(err){
        ResponseError(res, 500, 'Internal server error.');
    }
}

export const signIn = async ({ body }: Request, res: Response) => {
    try{
        const { email, password } = body;
        const user = await getUserByEmail(email);
        if(!user) return res.status(400).json('Email or password is wrong');
        const isValidPass: boolean = await user.validatePassword(password);
        if(!isValidPass) return res.status(400).json('Invalid password');
    
        const token = await getToken(user._id);
        ResponseSuccess(res, 200, user, 'The user logged successfully.', token);
    }catch(err){
        ResponseError(res, 500, 'Internal server error.');
    }
}

export const deleteUser = async ({ params }: Request, res: Response) => {
    try{
        const { id } = params;
        const result = await apiDeleteUser(id);        
        ResponseSuccess(res, 200, [], 'The user delete successfully.');
    }catch(err){
        ResponseError(res, 500, 'Internal server error.');
    }
}