import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from '../routes';
import connectDataBase from '../db/mongo';
import { options } from './swaggerOptions';
import { ResponseError } from '../utils/response.util';
import seedUser from '../seed/user.seed';

// Swagger documentation
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app: Application = express();
/**
 * 
 * Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Validando que la base de datos esté funcionando.
app.use('*', async(req: Request, res: Response, next) => {
    const dataBase = await connectDataBase();
    if (!dataBase) {
        ResponseError(res, 500, 'No se pudo establecer conexión con la base de datos. Po favor contacte con un administrador');
    } else {
      return next();
    }
});

// Siembra de datos iniciales
seedUser();

// options swagger docs
const configSwaggerDoc = swaggerJsDoc(options);

app.use('/v1', routes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(configSwaggerDoc));

export default app;