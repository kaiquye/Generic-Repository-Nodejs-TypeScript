import { RepositoryAbstract } from '../../../../genericDatabase/abstract/repository.abstract';
import { IUSER } from '../../entities/user.entity';

/**
 * this is an adapter for dependency injection
 **/
export abstract class userRepositoryAdapter extends RepositoryAbstract<IUSER> {}
