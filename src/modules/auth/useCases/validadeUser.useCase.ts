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
      const infosUser = (await this.repository._USER._exists({
        email: email,
      })) as IUSER;

      const match = compareSync(password, infosUser.passwordhash);
      delete infosUser.passwordhash;

      if (!match) return null;
      return infosUser;
    } catch (e) {
      return null;
    }
  }
}
