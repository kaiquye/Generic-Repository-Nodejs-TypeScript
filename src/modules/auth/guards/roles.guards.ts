import { SetMetadata } from '@nestjs/common';
import { Role } from './Role';

export const ROLES_KEY = 'roles';
export const GRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);