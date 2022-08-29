import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from './connection/prisma';
import { FactoryAbstract } from './abstract/factory.abstract';
import { RepositoryFactory } from './factory/repository.factory';
import { userRepositoryAdapter } from '../modules/user/repository/adapter/userRepository.adapter';
import { UserRepository } from '../modules/user/repository/userRepository';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  exports: [RepositoryFactory],
  providers: [
    PrismaService,
    RepositoryFactory,
    UserRepository,
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
export class DatabaseModule {}
