import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';

import validateResult from '../utils/validate.utils';
import { getUserByEmail } from '../services/user.service';

const validateUser = [
    check('username')
        .exists()
        .withMessage('The username is required field')
        .not()
        .isEmpty()
        .withMessage('The username can not be empty'),
    check('email')
        .exists()
        .withMessage('The email is required field')
        .isEmail()
        .withMessage('The email format is incorrect')
        .custom(async (value) => {
            const findUserByEmail = await getUserByEmail(value);
            if (!findUserByEmail) return true;
            throw new Error('The email must be unique');
        }),
    check('password')
        .exists()
        .withMessage('The password is required field')
        .not()
        .isEmpty()
        .withMessage('The password can not be empty'),
    (req:Request , res:Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
]

export default validateUser;