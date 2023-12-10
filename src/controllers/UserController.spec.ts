import { UserController } from "./UserController";
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import {makeMockRequest} from "../__mocks__/mockRequest.mock";

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
};
jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService;
        })
    };
})

describe('UserController', () => {
    const userController = new UserController();
    const mockResponse = makeMockResponse();

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Guilherme',
                email: 'dev@iugmali.com',
                password: 'toor'
            }
        } as Request;
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' });
    });

    it('Deve retornar erro caso o usuário não passe o campo name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'dev@iugmali.com',
                password: 'toor'
            }
        } as Request;
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios.' });
    });

    it('Deve retornar erro caso o usuário não passe o campo email', () => {
        const mockRequest = {
            body: {
                name: 'Guilherme',
                email: '',
                password: 'toor'
            }
        } as Request;
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios.' });
    });

    it('Deve retornar erro caso o usuário nao informe o password', () => {
        const mockRequest = {
            body: {
                name: 'Guilherme',
                email: 'dev@iugmali.com',
                password: ''
            }
        } as Request;
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios.' });
    });

    it('Deve retornar o usuário com o userId informado', () => {
        const mockRequest = makeMockRequest({
            params: {
                userId: '123456'
            }
        })
        userController.getUser(mockRequest, mockResponse);
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456');
        expect(mockResponse.state.status).toBe(200);
    });
})
