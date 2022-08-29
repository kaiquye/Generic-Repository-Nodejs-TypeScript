import UseCase from './useCase.interface';
import { FactoryAbstract } from '../../../database/abstract/factory.abstract';
import { IUSER } from '../../user/entities/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { HttpReturn } from '../../../common/error/error';
import { codes } from '../../../common/error/statusCodes';
import { compareSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';

/**
 * @interface create a custom typing for queries
 **/
interface whererOR<T> {
  OR: Partial<T>[];
}

@Injectable()
export class ValidadeUserUseCase {
  constructor(private repository: FactoryAbstract) {}
  async execute(email: string, password: string): Promise<any> {
    try {
      console.log(email);
      const user = await this.repository._USER._exists({
        email: 'kaiqu2saasa2e@gsmail.com',
      });
      console.log(user);
      if (!user) return null;
      return user;
    } catch (e) {
      return null;
    }
  }
}
