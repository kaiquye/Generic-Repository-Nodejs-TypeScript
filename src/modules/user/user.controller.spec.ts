import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './useCases/writing/createUser.useCase';
import { FindAllUserUseCase } from './useCases/reading/findAllUser.useCase';
import { DeleteUserUseCase } from './useCases/writing/deleteUser.useCase';
import { FindByIdUseCase } from './useCases/reading/findById.useCase';
import { CreateUserDto } from './dto/create-user.dto';
import { __USER_MOCK__ } from '../../common/mocks/mock';

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
            execute: jest.fn().mockResolvedValue(''),
          },
        },
        {
          provide: FindAllUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(''),
          },
        },
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(''),
          },
        },
        {
          provide: FindByIdUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(''),
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

      console.log('----', result, userDto);
      // expect(result).toEqual(userDto);
    });
  });
});
