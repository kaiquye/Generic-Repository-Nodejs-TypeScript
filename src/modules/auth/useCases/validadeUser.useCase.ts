import { FactoryAbstract } from '../../../generiDatabase/abstract/factory.abstract';
import { IUSER } from '../../user/entities/user.entity';
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
