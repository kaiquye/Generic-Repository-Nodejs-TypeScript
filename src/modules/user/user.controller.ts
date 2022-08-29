import {
  Controller,
  Post,
  Body,
  UseFilters,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpExceptionFilter } from '../../common/error/HttpExceptionFilter';
import { CreateUserUseCase } from './useCases/writing/createUser.useCase';
import { AuthGuard } from '@nestjs/passport';
import { FindAllUserUseCase } from './useCases/reading/findAllUser.useCase';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { LocalAuthGuard } from '../auth/guards/local.guards';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findAllUser: FindAllUserUseCase,
  ) {}

  @Post()
  @UseFilters(LocalAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUser.execute(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.findAllUser.execute();
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
