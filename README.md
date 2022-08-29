## Generic Repository with nestjs and primsa 

## About 
**Utilidade:**
A ideia desse padrão é não repetir logicas varias vezes ou criar 
repositorios "em cima dos outros", em prol do **DRY**. 

* **DRY** : Don't repeat yourself (em português: Não repita a si mesmo) é um 
conceito de programação o qual propõe que cada porção de conhecimento em um sistema deve possuir uma representação
única.

exemplo :
-  ```javascript
    _create<Query = T>(data: Query): Promise<void | Query> {
        return this.ORM[this.table].create({ data });
    }
    ```


**ORM:** Com esse padrão podemos trocar facilmente de ORM sem precisa reescrever todos os repositorios da nossa 
aplicação.

exemplo:
-  ```javascript
    constructor(table: TablesEnum, ORM: PrismaService) {
        this.table = table;
        this.ORM = ORM;
    }
    ```

**AbstractRepositorty:** Abstraimos os metodos comum em um único arquivo é depois extendemos nosso repositorio da class abstract.

exemplo: 

<h3 align="center">Repositorio abstrato</h3>
```javascript
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
```
<h4 align="center">Repositorio concreto</h4>

Nosso adaptador.
```javascript
    export abstract class userRepositoryAdapter extends RepositoryAbstract<IUSER> {}
```

Nosso repositorio concreto que extende do nosso adaptador.
```javascript
    import { userRepositoryAdapter } from './adapter/userRepository.adapter';
    import { TablesEnum } from '../../../genericDatabase/tables/tables.enum';
    import { PrismaService } from '../../../genericDatabase/connection/prisma';
    import { Injectable } from '@nestjs/common';
    
    @Injectable()
    export class UserRepository extends userRepositoryAdapter {
      constructor(private prisma: PrismaService) {
        super(TablesEnum.USER, prisma);
      }
        ...metodos personalizados da nossa entidade ficariam aqui.
    }
```




<h4 align="center">Fabrica de repositorios</h4>

Essa é nossa **abstract factory**. Todos os repositorios são iniciados aqui com a ajuda do metodo **OnApplicationBootstrap**.

```javascript
    import { FactoryAbstract } from '../abstract/factory.abstract';
    import { userRepositoryAdapter } from '../../modules/user/repository/adapter/userRepository.adapter';
    import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
    
    /**
     * this class is responsible for creating a factory of repositories and starting them when the
     * application starts.
     * Here I install all the repositories of my project, centralizing them all
     *
     * @example
     * constructor(private repository: FactoryAbstract) {}
     */
    
    @Injectable()
    export class RepositoryFactory
      implements FactoryAbstract, OnApplicationBootstrap
    {
      _USER: userRepositoryAdapter;
      _ADDRESS: addressRepositoryAdapter;
      _STATE: stateRepositoryAdapter
    
      constructor(
          private userRepositoryConcrete: userRepositoryAdapter,
          private addressRepositoryAdapter: addressRepositoryAdapter,
          private stateRepositoryAdapter: stateRepositoryAdapter
    ) {}
    
      onApplicationBootstrap(): any {
        this._USER = this.userRepositoryConcrete;
        this._ADDRESS: this.addressRepositoryAdapter;
        this._STATE: this.stateRepositoryAdapter
      }
    }

```
