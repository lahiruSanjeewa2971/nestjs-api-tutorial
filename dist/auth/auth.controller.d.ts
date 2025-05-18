import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}
