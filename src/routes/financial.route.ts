import { Router } from 'express';

import { listFinancial } from '../controllers/financial.controller';

const financialRoute: Router = Router();

financialRoute.get('/', listFinancial);

export default financialRoute;