import * as bcrypt from 'bcrypt';
import UseCase from '../useCase.interface';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { FactoryAbstract } from '../../../../database/abstract/factory.abstract';
import { IUSER } from '../../entities/user.entity';
import { HttpReturn } from '../../../../common/error/error';
import { codes } from '../../../../common/error/statusCodes';

/**
 * @interface create a custom typing for queries
 **/
interface whererOR<T> {
  OR: Partial<T>[];
}

@Injectable()
export class CreateUserUseCase
  implements UseCase<CreateUserDto, HttpReturn<any>>
{
  private alreadyError = 'user already registered';

  constructor(private repository: FactoryAbstract) {}
  async execute(request: CreateUserDto): Promise<any> {
    const isAlready = await this.repository._USER._exists<whererOR<IUSER>>({
      OR: [{ email: request.email }, { first_name: request.first_name }],
    });

    if (isAlready)
      return HttpReturn.fail(this.alreadyError, codes.ALREADY_REPORTED);

    const saltRounds = 10;
    const passwordhash = bcrypt.hashSync(request.password, saltRounds);
    delete request.password;

    const userInfos: IUSER = { ...request, passwordhash };

    const created = await this.repository._USER._create<IUSER>(userInfos);

    return HttpReturn.ok<IUSER | void>('created', codes.CREATED, created);
  }
}
