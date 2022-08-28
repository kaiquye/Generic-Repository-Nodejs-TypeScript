import { FactoryAbstract } from '../abstract/factory.abstract';
import { userRepositoryAdapter } from '../../modules/user/repository/adapter/userRepository.adapter';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

/**
 * @class RepositoryFactory this class is responsible for creating a factory of repositories and starting them when the
 * application starts.
 * @description Here I install all the repositories of my project, centralizing them all
 */

@Injectable()
export class RepositoryFactory
  implements FactoryAbstract, OnApplicationBootstrap
{
  _USER: userRepositoryAdapter;

  constructor(private userRepositoryConcrete: userRepositoryAdapter) {}

  onApplicationBootstrap(): any {
    this._USER = this.userRepositoryConcrete;
  }
}
