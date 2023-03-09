import { Router } from 'express';
import { list, save, update } from '../controllers/investment.controller';

const investmentRoute: Router = Router();

investmentRoute.get('/', list);

investmentRoute.post('/', save);

investmentRoute.put('/', update);

export default investmentRoute;