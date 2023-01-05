import { Router } from 'express';
import userRoute from './user.route';
import contactRoute from './contact.route';
import { tokenValidation } from '../utils/token.util';
 
const router: Router = Router();

/**
 * User entry point
*/
router.use('/auth', userRoute);
router.use('/contact', contactRoute);
export default router;