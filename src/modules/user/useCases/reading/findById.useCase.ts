import UseCase from '../useCase.interface';
import { FactoryAbstract } from '../../../../genericDatabase/abstract/factory.abstract';
import { IUSER } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindByIdUseCase implements UseCase<number | string, Promise<any>> {
  constructor(private repository: FactoryAbstract) {}

  async execute(id: number | string): Promise<object | IUSER> {
    const user = await this.repository._USER._findById({ id });
    return user || {};
  }
}
