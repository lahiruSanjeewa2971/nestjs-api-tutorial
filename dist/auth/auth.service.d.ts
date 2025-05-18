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
        id: number;
        createdAt: Date;
        email: string;
        firstName: string;
    } | undefined>;
    signin(dto: LoginDto): Promise<{
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            firstName: string;
            lastName: string | null;
        } | null;
        token: string;
    }>;
    signToken(userId: number, email: string): Promise<string>;
}
