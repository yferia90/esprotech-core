import { Request, Response } from "express";

import { listFinancialService } from '../services/financial.service';
import { ResponseSuccess, ResponseError } from '../utils/response.util';

export const listFinancial = async (req: Request, res: Response) => {
    try{
        const result = await listFinancialService();
        ResponseSuccess(res, 200, result);
    }catch(err){
        ResponseError(res, 500, 'Internal server error.');
    }
}
