import { Controller, Body, Get, UseGuards, Post, Req } from '@nestjs/common';
import { LoginUserUseCase } from './useCases/loginUser.useCase';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly genereteToken: LoginUserUseCase) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  login(@Req() req) {
    return this.genereteToken.execute(req.user);
  }
}
