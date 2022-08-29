import { userRepositoryAdapter } from './adapter/userRepository.adapter';
import { TablesEnum } from '../../../generiDatabase/tables/tables.enum';
import { PrismaService } from '../../../generiDatabase/connection/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends userRepositoryAdapter {
  constructor(private prisma: PrismaService) {
    super(TablesEnum.USER, prisma);
  }
}
