import UseCase from '../useCase.interface';
import { FactoryAbstract } from '../../../../genericDatabase/abstract/factory.abstract';
import { IUSER } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUserUseCase implements UseCase<any, Promise<any>> {
  constructor(private repository: FactoryAbstract) {}
  async execute(request?: any): Promise<any> {
    const users = await this.repository._USER._findAll<any>({
      second_name: true,
      email: true,
      first_name: true,
    });

    return users || [];
  }
}
