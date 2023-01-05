import app from './config/express.config';
import logger from './utils/logger.utils';

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Escuchando por el puerto ${ port }`));