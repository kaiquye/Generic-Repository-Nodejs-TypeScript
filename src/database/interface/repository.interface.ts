/**
 * @type @Query
 * query object and a way to dynamically type a query, without having to modify the concrete repository
 */

interface Reader<T> {
  _findAll(): Promise<T[] | any>;
  _findById<Query = number>(id: Query): Promise<T | void>;
  _exists<Query = Partial<T>>(data: Query): Promise<boolean | Query>;
}

interface Writer<T> {
  _create<Query = T>(data: Query): Promise<Query | void>;
  _delete<Query = number>(id: Query): Promise<boolean | void | Query>;
}

export type IRepository<T> = Reader<T> & Writer<T>;
