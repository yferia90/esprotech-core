import { Router } from 'express';

import { listContact, saveContact } from '../controllers/contact.controller';

const contactRoute: Router = Router();

contactRoute.get('/list', listContact);

contactRoute.post('/save', saveContact);

export default contactRoute;