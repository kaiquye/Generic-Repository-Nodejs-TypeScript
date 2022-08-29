import UseCase from '../useCase.interface';
import { FactoryAbstract } from '../../../../genericDatabase/abstract/factory.abstract';
import { IUSER } from '../../entities/user.entity';
import { HttpReturn } from '../../../../common/error/error';
import { codes } from '../../../../common/enum/statusCodes';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase implements UseCase<IUSER, any> {
  private _notFound = 'register not found';
  private _deleted = 'user successfully paid';
  constructor(private repository: FactoryAbstract) {}

  async execute(id): Promise<any> {
    const itExists = await this.repository._USER._exists({ id });

    if (!itExists) {
      return HttpReturn.fail(this._notFound, codes.NOT_FOUND);
    }

    const deleted = await this.repository._USER._delete({ id });

    if (deleted) return HttpReturn.ok(this._deleted, codes.OK, itExists);
  }
}
