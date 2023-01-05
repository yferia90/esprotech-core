import ContactModel from "../models/contact.schema";
import { ContactInterface } from "../types/contact.type";

/**
 * Paginate contacts
 * @returns 
 */
const getContacts = async (limit: number, page: number) => {
    try{
        const findContacs = await ContactModel.paginate({}, {limit, page});
        return findContacs;
    }catch(err){
        return "Internal server error";
    }
}

/**
 * Insertando contacto
 * @param contacto 
 * @returns 
 */
const insertContact = async (body: ContactInterface) => {
    try{
        const contact: ContactInterface = new ContactModel({
            name: body.name,
            email: body.email,
            celular: body.celular,
            message: body.message,
        });
        const contactSave = await ContactModel.create(contact);
        return contactSave._id;
    }catch(err){
        return "Internal server error";
    }
}

export {
    getContacts,
    insertContact,
}