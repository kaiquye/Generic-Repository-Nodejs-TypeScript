import UseCase from './useCase.interface';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginUserUseCase implements UseCase<any, any> {
  constructor(private jwtServices: JwtService) {}

  execute(request?: any): any {
    return {
      token: this.jwtServices.sign({
        email: request.email,
        first_name: request.first_name,
      }),
    };
  }
}
