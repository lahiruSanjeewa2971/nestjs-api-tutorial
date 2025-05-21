import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}
