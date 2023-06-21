import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = [];
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log');
        userService.createUser('iugmali', 'dev@iugmali.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb);
    });

    it('Deve chamar todos os usuários', () => {
        const response = userService.getAllUsers();
        expect(response).toStrictEqual([{name: 'iugmali', email: 'dev@iugmali.com'}]);
    });

    it('Deve deletar usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log');
        userService.deleteUser({name: 'iugmali', email: 'dev@iugmali.com'});
        expect(mockConsole).toHaveBeenCalledWith('Deletando usuário...', {name: 'iugmali', email: 'dev@iugmali.com'});
    });
})
