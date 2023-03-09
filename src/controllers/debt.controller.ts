import { Request, Response } from "express";

import { getAll, insertRecord } from '../services/debt.service';
import { ResponseSuccess, ResponseError } from '../utils/response.util';
import { QueryData } from '../types/user.type';
import TYPE_OPERATION from '../utils/enum.operation';

export const list = async ({ query }: Request, res: Response) => {
    try{
        const { limit, page } = query as unknown as QueryData;
        const queryLimit = parseInt(limit) || 10;
        const queryPage = parseInt(page) || 1;
        const listRecord = await getAll(queryLimit, queryPage);
        ResponseSuccess(res, 200, listRecord);
    }catch(err){
        ResponseError(res, 500, 'Internal server error.');
    }
}

export const save = async (req: Request, res: Response) => {
    try{
        const { body } = req;
        const type_operation = TYPE_OPERATION.add;
        const monto = await insertRecord(body, type_operation);
        ResponseSuccess(res, 201, [monto], 'El monto adeudado se insertó correctamente.');
    }catch(err){
        ResponseSuccess(res, 201, [], 'El monto adeudado se insertó correctamente.');
    }
}

export const update = async (req: Request, res: Response) => {    
    try{
        const { body } = req;
        const type_operation = TYPE_OPERATION.sub;
        const montoAhorro = await insertRecord(body, type_operation);
        ResponseSuccess(res, 201, [montoAhorro], 'El monto de gasto se actualización correctamente.');
    }catch(err){
        ResponseSuccess(res, 201, [], 'El monto de gasto se actualización correctamente.');
    }
}