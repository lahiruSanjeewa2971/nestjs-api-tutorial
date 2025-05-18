import { ForbiddenException, Injectable } from '@nestjs/common';
import {} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  // dependency injection
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // Generate password hash
    const hashPassword = await argon.hash(dto.password);

    try {
      // save new user in the db
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashPassword,
          firstName: dto.firstName,
        },
        // control what's going to go within the API response
        select: {
          id: true,
          email: true,
          firstName: true,
          createdAt: true,
        },
      });

      // return the saved user
      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw error;
      }
    }
  }

  async signin(dto: LoginDto) {
    try {
      // find the user by email
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      // if user not exist throw exception
      if (!user) {
        throw new ForbiddenException('Credentials incorrect.');
      }

      // compare password
      const pwMatches = await argon.verify(user.hash, dto.password);
      // if password incorrect throw exception
      if (!pwMatches) {
        throw new ForbiddenException('Credentials incorrect.');
      }

      // send back the user
      // Re-fetch without hash
      const safeUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return safeUser;
    } catch (error) {
      // Log the error for debugging
      console.error('Sign-in error:', error);

      // If it's already a ForbiddenException, rethrow it as is
      if (error instanceof ForbiddenException) {
        throw error;
      }

      // Otherwise, throw a generic forbidden exception
      throw new ForbiddenException('Something went wrong during sign-in.');
    }
  }
}
