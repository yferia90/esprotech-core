import { Router } from 'express';
import { list, save, update } from '../controllers/spend.controller';

const spendRoute: Router = Router();

spendRoute.get('/', list);

spendRoute.post('/', save);

spendRoute.put('/', update);

export default spendRoute;