import request from 'supertest';
import app from '../config/express.config';

describe('Test user endpoints', () => {
    test('save user POST [ SUCCESS ]', async () => {
        const saveUserPOST = await request(app).post('/v1/auth/signUp').send({
            "username": "flock",
            "email": "flock@gmail.com",
            "password": "flock"
        });
        expect(saveUserPOST.statusCode).toBe(201);
    });

    test('login user POST [ SUCCESS ]', async () => {
        const loginUser = await request(app).post('/v1/auth/signIn')
        .send({
            "email": "flock@gmail.com",
            "password": "flock"
        });
        const body = loginUser.body;
        const { message } = body;
        expect(message).toBe('The user logged successfully.');
    });

    test('list users GET [ SUCCESS ]', async () => {
        const loginUser = await request(app).get('/v1/auth/users');
        expect(loginUser.statusCode).toBe(200);
    });
});