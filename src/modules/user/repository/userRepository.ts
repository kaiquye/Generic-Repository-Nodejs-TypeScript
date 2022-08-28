import { userRepositoryAdapter } from './adapter/userRepository.adapter';
import { TablesEnum } from '../../../database/tables/tables.enum';
import { PrismaService } from '../../../database/connection/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends userRepositoryAdapter {
  constructor(private prisma: PrismaService) {
    super(TablesEnum.USER, prisma);
  }
}
