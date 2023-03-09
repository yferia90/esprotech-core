import { Router } from 'express';
import userRoute from './user.route';
import contactRoute from './contact.route';
import savingRoute from './saving.route';
import financialRoute from './financial.route';
import investmentRoute from './investment.route';
import spendRoute from './spend.route';
import debtRoute from './debt.route';
import { tokenValidation } from '../utils/token.util';
 
const router: Router = Router();

/**
 * User entry point
*/
router.use('/auth', userRoute);
router.use('/contact', contactRoute);
router.use('/financial', tokenValidation, financialRoute);
router.use('/saving', tokenValidation, savingRoute);
router.use('/investment', tokenValidation, investmentRoute);
router.use('/spend', tokenValidation, spendRoute);
router.use('/debt', tokenValidation, debtRoute);
export default router;