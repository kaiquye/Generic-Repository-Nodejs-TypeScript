import {
  Controller,
  Post,
  Body,
  UseFilters,
  Get,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './useCases/writing/createUser.useCase';
import { FindAllUserUseCase } from './useCases/reading/findAllUser.useCase';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { DeleteUserUseCase } from './useCases/writing/deleteUser.useCase';
import { Roles } from '../auth/Roles/Roles';
import { Role } from '../auth/Roles/Role';
import { HttpExceptionFilter } from '../../common/error/HttpExceptionFilter';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findAllUser: FindAllUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Post()
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(+id);
  }
}
