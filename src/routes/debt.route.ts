import { Router } from 'express';
import { list, save, update } from '../controllers/debt.controller';

const debtRoute: Router = Router();

debtRoute.get('/', list);

debtRoute.post('/', save);

debtRoute.put('/', update);

export default debtRoute;