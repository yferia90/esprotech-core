import { Response } from 'express';

const ResponseSuccess = (res: Response, status = 200, data = {}, message = '', token = '') => {
    let newData = [];
    newData = Array.isArray(data) ? data : [data];
    res.status(status).send({
        error: false,
        data: newData,
        message,
        token
    });
}

const ResponseError = (res: Response, status = 500, message = '', data = {}) => {
    let newData = [];
    newData = Array.isArray(data) ? data : [];
    res.status(status).send({
        error: true,
        data: newData,
        message: message
    });
}

export {
    ResponseSuccess,
    ResponseError
}