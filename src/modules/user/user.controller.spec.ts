import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './useCases/writing/createUser.useCase';
import { FindAllUserUseCase } from './useCases/reading/findAllUser.useCase';
import { DeleteUserUseCase } from './useCases/writing/deleteUser.useCase';
import { FindByIdUseCase } from './useCases/reading/findById.useCase';
import { CreateUserDto } from './dto/create-user.dto';
import { __ARRAY_USERS_MOCK__, __USER_MOCK__ } from '../../common/mocks/mock';

describe('UserController', () => {
  let useController: UserController;
  let createUser: CreateUserUseCase;
  let findAllUser: FindAllUserUseCase;
  let deleteUser: DeleteUserUseCase;
  let findById: FindByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(__USER_MOCK__),
          },
        },
        {
          provide: FindAllUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(__ARRAY_USERS_MOCK__),
          },
        },
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(__USER_MOCK__),
          },
        },
        {
          provide: FindByIdUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(__USER_MOCK__),
          },
        },
      ],
    }).compile();

    useController = module.get<UserController>(UserController);
    createUser = module.get<CreateUserUseCase>(CreateUserUseCase);
    findAllUser = module.get<FindAllUserUseCase>(FindAllUserUseCase);
    deleteUser = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    findById = module.get<FindByIdUseCase>(FindByIdUseCase);
  });

  it('should be defined', () => {
    expect(useController).toBeDefined();
    expect(createUser).toBeDefined();
    expect(findAllUser).toBeDefined();
    expect(deleteUser).toBeDefined();
    expect(findById).toBeDefined();
  });

  describe('use controller', function () {
    it('create a new user', async () => {
      const userDto: CreateUserDto = __USER_MOCK__;

      const result = await useController.create(userDto);

      expect(result).toEqual(userDto);
      expect(createUser.execute).toHaveReturnedTimes(1);
    });
    it('search all users', async () => {
      const result = await findAllUser.execute();

      expect(result).toEqual(__ARRAY_USERS_MOCK__);
    });
    it('deleting a user ', async () => {
      const result = await deleteUser.execute(__USER_MOCK__);

      expect(result).toEqual(__USER_MOCK__);
    });
  });
});
