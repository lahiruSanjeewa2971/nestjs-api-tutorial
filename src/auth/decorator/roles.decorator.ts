import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
// here set the incomming role into metadata. then it can be read by roles.guard
