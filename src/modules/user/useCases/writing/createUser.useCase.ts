import UseCase from '../useCase.interface';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { FactoryAbstract } from '../../../../database/abstract/factory.abstract';

@Injectable()
export class CreateUserUseCase implements UseCase<CreateUserDto, Promise<any>> {
  constructor(private repositoriesFactory: FactoryAbstract) {}
  async execute(request: CreateUserDto): Promise<any> {
    await this.repositoriesFactory._USER._create(request);
    return null;
  }
}
