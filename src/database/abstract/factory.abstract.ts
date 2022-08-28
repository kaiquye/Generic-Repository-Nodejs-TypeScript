import { userRepositoryAdapter } from '../../modules/user/repository/adapter/userRepository.adapter';

export abstract class FactoryAbstract {
  abstract _USER: userRepositoryAdapter;
  // abstract _ADDRESS: AddressRepositoryAdapter;
}
