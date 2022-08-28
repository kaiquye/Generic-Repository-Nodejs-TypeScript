import { RepositoryAbstract } from '../../../../database/abstract/repository.abstract';
import { IUSER } from '../../entities/user.entity';

export abstract class userRepositoryAdapter extends RepositoryAbstract<IUSER> {}
