import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidadeUserUseCase } from '../useCases/validadeUser.useCase';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validadeUserUseCase: ValidadeUserUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log(password, email);
    const user = await this.validadeUserUseCase.execute(email, password);
    if (!user) throw new UnauthorizedException('email/password invalid');
    return user;
  }
}
