import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userRepositoryAdapter } from './repository/adapter/userRepository.adapter';
import { UserRepository } from './repository/userRepository';
import { CreateUserUseCase } from './useCases/writing/createUser.useCase';
import { PrismaService } from '../../database/connection/prisma';
import { FactoryAbstract } from '../../database/abstract/factory.abstract';
import { RepositoryFactory } from '../../database/factory/repository.factory';
import { DatabaseModule } from '../../database/database.module';
import { FindAllUserUseCase } from './useCases/reading/findAllUser.useCase';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => DatabaseModule), forwardRef(() => AuthModule)],
  exports: [UserRepository],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    UserRepository,
    FindAllUserUseCase,
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
