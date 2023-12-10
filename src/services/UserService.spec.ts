import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken';

jest.mock('../repositories/UserRepository');
jest.mock('../database', () => {
    initialize: jest.fn()
});
jest.mock('jsonwebtoken');

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)
    const mockUser = {
        user_id: '123456',
        name: 'Guilherme',
        email: 'dev@iugmali.com',
        password: 'toor'
    };

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser('Guilherme', 'dev@iugmali.com', 'toor');
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject(mockUser);
    });

    it('Deve retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser));
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('dev@iugmali.com', 'toor');
        expect(token).toBe('token');
    });

    it('Deve retornar um erro caso não encontre um usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null));
        await expect(userService.getToken('invalid@test.com', '123456')).rejects.toThrowError(new Error('invalid email or password.'));
    });

})
