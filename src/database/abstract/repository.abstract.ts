import { IRepository } from '../interface/repository.interface';
import { TablesEnum } from '../tables/tables.enum';
import { PrismaService } from '../connection/prisma';

export abstract class RepositoryAbstract<T> implements IRepository<T> {
  private readonly table: TablesEnum;
  private readonly ORM: PrismaService;

  constructor(table: TablesEnum, ORM: PrismaService) {
    this.table = table;
    this.ORM = ORM;
  }

  _create<Query = T>(data: Query): Promise<void | Query> {
    return Promise.resolve(undefined);
  }

  _delete<Query = number>(id: Query): Promise<boolean | void | Query> {
    return Promise.resolve(undefined);
  }

  _exists<Query = Partial<T>>(data: Query): Promise<boolean | Query> {
    return Promise.resolve(undefined);
  }

  _findAll(): Promise<any> {
    return Promise.resolve(undefined);
  }

  _findById<Query = number>(id: Query): Promise<void | T> {
    return Promise.resolve(undefined);
  }
}