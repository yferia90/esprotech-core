import { Router } from 'express';

import { listSaving, saveSaving, updateSaving } from '../controllers/saving.controller';

const savingRoute: Router = Router();

savingRoute.get('/', listSaving);

savingRoute.post('/', saveSaving);

savingRoute.put('/', updateSaving);

export default savingRoute;