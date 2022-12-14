import { IRepository } from '../interface/repository.interface';
import { TablesEnum } from '../tables/tables.enum';
import { PrismaService } from '../connection/prisma';

/**
 *  this is an abstract repository that new repositories can implement.
 *
 *  with adapter
 *  @example @Injectable()
 *  export class UserRepository extends userRepositoryAdapter {
 *   constructor(private prisma: PrismaService) {
 *     super(nameTable, instaceorm);
 *   }
 * }
 *  without adapter
 * @example @Injectable()
 * export class UserRepository extends RepositoryAbstract<Type>  {
 *   constructor(private prisma: PrismaService) {
 *     super(nameTable, instaceorm);
 *   }
 * }
 **/
export abstract class RepositoryAbstract<T> implements IRepository<T> {
  private readonly table: TablesEnum;
  private readonly ORM: PrismaService;

  constructor(table: TablesEnum, ORM: PrismaService) {
    this.table = table;
    this.ORM = ORM;
  }

  _create<Query = T>(data: Query): Promise<void | Query> {
    return this.ORM[this.table].create({ data });
  }

  _delete<Query = number>(where: Query): Promise<boolean | void | Query> {
    return this.ORM[this.table].delete({ where });
  }

  _exists<Query = Partial<T>>(where: Query): Promise<boolean | Query> {
    return this.ORM[this.table].findFirst({ where });
  }

  _findAll<Query>(select?: Query): Promise<any> {
    if (!select) {
      return this.ORM[this.table].findMany();
    }
    return this.ORM[this.table].findMany({
      select,
    });
  }

  _findById<Query = number>(id: Query): Promise<void | T> {
    return this.ORM[this.table].findUnique({
      where: {
        id: id,
      },
    });
  }
}
