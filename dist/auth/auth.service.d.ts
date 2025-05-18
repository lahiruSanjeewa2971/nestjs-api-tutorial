import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(dto: AuthDto): Promise<{
        email: string;
        firstName: string;
        id: number;
        createdAt: Date;
    } | undefined>;
    signin(dto: LoginDto): Promise<{
        email: string;
        firstName: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        lastName: string | null;
    } | null>;
}
