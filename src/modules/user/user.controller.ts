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
import { HttpExceptionFilter } from '../../common/httpResponseTemplate/HttpExceptionFilter';
import { FindByIdUseCase } from './useCases/reading/findById.useCase';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findAllUser: FindAllUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly findById: FindByIdUseCase,
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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findById.execute(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(+id);
  }
}
