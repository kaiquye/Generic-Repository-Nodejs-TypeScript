import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userRepositoryAdapter } from './repository/adapter/userRepository.adapter';
import { UserRepository } from './repository/userRepository';
import { CreateUserUseCase } from './useCases/writing/createUser.useCase';
import { PrismaService } from '../../genericDatabase/connection/prisma';
import { FactoryAbstract } from '../../genericDatabase/abstract/factory.abstract';
import { RepositoryFactory } from '../../genericDatabase/factory/repository.factory';
import { DatabaseModule } from '../../genericDatabase/database.module';
import { FindAllUserUseCase } from './useCases/reading/findAllUser.useCase';
import { AuthModule } from '../auth/auth.module';
import { DeleteUserUseCase } from './useCases/writing/deleteUser.useCase';
import { FindByIdUseCase } from './useCases/reading/findById.useCase';

@Module({
  imports: [forwardRef(() => DatabaseModule), forwardRef(() => AuthModule)],
  exports: [UserRepository],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    UserRepository,
    FindAllUserUseCase,
    DeleteUserUseCase,
    FindByIdUseCase,
    {
      provide: FactoryAbstract,
      useClass: RepositoryFactory,
    },
    {
      provide: userRepositoryAdapter,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
