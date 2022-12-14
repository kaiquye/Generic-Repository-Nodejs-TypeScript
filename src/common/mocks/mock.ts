import { CreateUserDto } from '../../modules/user/dto/create-user.dto';

export const __USER_MOCK__: CreateUserDto = {
  id: 1,
  first_name: 'kaique',
  second_name: 'mendes',
  email: 'kaique@gmail.com',
  password: '12345',
};

export const __ARRAY_USERS_MOCK__: CreateUserDto[] = [
  __USER_MOCK__,
  __USER_MOCK__,
];
