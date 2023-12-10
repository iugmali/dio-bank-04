import {getMockEntityManager} from "../__mocks__/mockEntityManager.mock";
import {UserRepository} from "./UserRepository";
import {User} from "../entities/User";
import {EntityManager} from "typeorm";

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockManager: Partial<EntityManager>;

  const mockUser: User = {
    user_id: '12345',
    name: 'Guilherme',
    email: 'dev@iugmali.com',
    password: 'toor'
  };

  beforeAll(async () => {
    mockManager = await getMockEntityManager({
      saveReturn: mockUser,
      findOneReturn: mockUser
    });
    userRepository = new UserRepository(mockManager as EntityManager);
  });

  it('Deve cadastrar um novo usuário no banco de dados', async () => {
    const response = await userRepository.createUser(mockUser);
    expect(mockManager.save).toHaveBeenCalled();
    expect(response).toMatchObject(mockUser);
  });

  it('Deve retornar um novo usuário ao buscar pelo id', async () => {
    const response = await userRepository.getUser(mockUser.user_id);
    expect(mockManager.findOne).toHaveBeenCalled();
    expect(response).toMatchObject(mockUser);
  });

  it('Deve retornar um novo usuário ao buscar pelo email e password', async () => {
    const response = await userRepository.getUserByEmailAndPassword(mockUser.email, mockUser.password);
    expect(mockManager.findOne).toHaveBeenCalled();
    expect(response).toMatchObject(mockUser);
  });
});
