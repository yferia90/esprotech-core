import mongoose, { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ContactInterface } from '../types/contact.type';

const ContactSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        celular: {
            type: String,
            required: false
        }
    }, {
        timestamps: true
    }
)

// Incluyendo el plugin de paginado al schema de contacto
ContactSchema.plugin(mongoosePaginate);

const ContactModel = model<ContactInterface, mongoose.PaginateModel<ContactInterface>>("contact", ContactSchema);

export default ContactModel;