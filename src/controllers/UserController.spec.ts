import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import {makeMockRequest} from "../__mocks__/mockRequest.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Guilherme',
                email: 'dev@iugmali.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' });
    });

    it('Deve verificar se existe o campo name ao criar usuário', () => {
        const mockRequest = {
            body: {
                email: 'dev@iugmali.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' });
    });

    it('Deve verificar se existe o campo email ao criar usuário', () => {
        const mockRequest = {
            body: {
                name: 'Guilherme'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' });
    });

    it('Deve retornar status 200 ao chamar todos os usuários', () => {
        const mockRequest = {} as Request;
        const mockResponse = makeMockResponse();
        userController.getAllUsers(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
    });

    it('Deve deletar usuário', () => {
        const mockRequest = {
            body: {
                name: 'Guilherme',
                email: 'dev@iugmali.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' });
    });
})
