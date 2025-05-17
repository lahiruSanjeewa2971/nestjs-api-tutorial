import { Injectable } from '@nestjs/common';
// import {User} from '../../generated/prisma'
import {} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  // dependency injection
  constructor(private prisma: PrismaService) {}

  signup() {
    return { msg: 'I am signup' };
  }

  signin() {
    return { msg: 'I am signin' };
  }
}
