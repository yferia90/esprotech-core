import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { ResponseError } from '../utils/response.util';

const validateResult = (req: Request, res: Response , next: NextFunction) => {
    try{
        validationResult(req).throw();
        return next();
    }catch(err){        
        ResponseError(res, 403, '', [err]);
    }
}

export default validateResult;