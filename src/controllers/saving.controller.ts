import { Request, Response } from "express";
import { getSaving, insertSaving } from '../services/saving.service';
import { ResponseSuccess, ResponseError } from '../utils/response.util';
import { QueryData } from '../types/user.type';

const TYPE_OPERATION = {
    add: 'ADD',
    sub: 'SUB'
};

export const listSaving = async ({ query }: Request, res: Response) => {
    try{
        const { limit, page } = query as unknown as QueryData;
        const queryLimit = parseInt(limit) || 10;
        const queryPage = parseInt(page) || 1;
        const listSaving = await getSaving(queryLimit, queryPage);
        ResponseSuccess(res, 200, listSaving);
    }catch(err){
        ResponseError(res, 500, 'Internal server error.');
    }
}

export const saveSaving = async (req: Request, res: Response) => {
    try{
        const { body } = req;
        const type_operation = TYPE_OPERATION.add;
        const montoAhorro = await insertSaving(req, body, type_operation);
        ResponseSuccess(res, 201, [montoAhorro], 'El ahorro se insertó correctamente.');
    }catch(err){
        ResponseSuccess(res, 201, [], 'El ahorro se insertó correctamente.');
    }
}

export const updateSaving = async (req: Request, res: Response) => {    
    try{
        const { body } = req;
        const type_operation = TYPE_OPERATION.sub;
        const montoAhorro = await insertSaving(req, body, type_operation);
        ResponseSuccess(res, 201, [montoAhorro], 'El ahorro se actualización correctamente.');
    }catch(err){
        ResponseSuccess(res, 201, [], 'El ahorro se actualización correctamente.');
    }
}