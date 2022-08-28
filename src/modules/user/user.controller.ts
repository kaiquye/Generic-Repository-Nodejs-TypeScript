import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpExceptionFilter } from '../../common/error/HttpExceptionFilter';
import { CreateUserUseCase } from './useCases/writing/createUser.useCase';

@Controller('user')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  tested(@Body() createUserDto: CreateUserDto) {
    return this.createUser.execute(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
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
