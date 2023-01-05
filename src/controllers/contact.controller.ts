import { Request, Response } from "express";

import { getContacts, insertContact } from '../services/contact.service';
import { ResponseSuccess, ResponseError } from '../utils/response.util';
import sendMailContactBusiness from '../services/mailsend.service';
import { QueryData } from '../types/user.type';

export const listContact = async ({ query }: Request, res: Response) => {
    try{
        const { limit, page } = query as unknown as QueryData;
        const queryLimit = parseInt(limit) || 10;
        const queryPage = parseInt(page) || 1;
        const listContact = await getContacts(queryLimit, queryPage);
        ResponseSuccess(res, 200, listContact);
    }catch(err){
        ResponseError(res, 500, 'Internal server error.');
    }
}

export const saveContact = async (req: Request, res: Response) => {
    try{
        const { body } = req;
        await insertContact(body);
        // Enviando correo electrónico al encargado de la gestión de los clientes
        await sendMailContactBusiness(body);
        ResponseSuccess(res, 201, [], 'El contacto se insertó correctamente.');
    }catch(err){
        ResponseError(res, 500, 'Su contacto no se pudo establecer con esproTech. Por favor, pruebe escribiendo por WhatsApp.');
    }
}
