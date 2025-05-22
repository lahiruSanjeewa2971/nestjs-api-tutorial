import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: AuthDto): Promise<{
        email: string;
        firstName: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        hash: string;
        lastName: string | null;
    } | undefined>;
    signin(dto: LoginDto): Promise<{
        data: {
            email: string;
            firstName: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            lastName: string | null;
        } | null;
        token: string;
    }>;
    signToken(userId: number, email: string, role: Role): Promise<string>;
}
