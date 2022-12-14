import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoginUserUseCase } from './useCases/loginUser.useCase';
import { ValidadeUserUseCase } from './useCases/validadeUser.useCase';
import { JwtStrategy } from './strategys/jwt.strategy';
import { LocalStrategy } from './strategys/local.strategy';
import { FactoryAbstract } from '../../genericDatabase/abstract/factory.abstract';
import { RepositoryFactory } from '../../genericDatabase/factory/repository.factory';
import { userRepositoryAdapter } from '../user/repository/adapter/userRepository.adapter';
import { UserRepository } from '../user/repository/userRepository';
import { PrismaService } from '../../genericDatabase/connection/prisma';
import { JwtAuthGuard } from './guards/jwt.guards';
import { LocalAuthGuard } from './guards/local.guards';
// import { RolesGuard } from './guards/roles.guards';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      privateKey: 'SECRET',
      signOptions: { expiresIn: '820s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUserUseCase,
    ValidadeUserUseCase,
    JwtStrategy,
    LocalStrategy,
    PrismaService,
    JwtAuthGuard,
    LocalAuthGuard,
    // RolesGuard,
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
export class AuthModule {}
