"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    prisma;
    jwt;
    config;
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        const hashPassword = await argon.hash(dto.password);
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hashPassword,
                    firstName: dto.firstName,
                    role: dto.role
                },
            });
            return newUser;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials taken');
                }
                throw error;
            }
        }
    }
    async signin(dto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!user) {
                throw new common_1.ForbiddenException('Credentials incorrect.');
            }
            const pwMatches = await argon.verify(user.hash, dto.password);
            if (!pwMatches) {
                throw new common_1.ForbiddenException('Credentials incorrect.');
            }
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
            const token = await this.signToken(user.id, user.email);
            const response = {
                data: safeUser,
                token: token,
            };
            return response;
        }
        catch (error) {
            console.error('Sign-in error:', error);
            if (error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.ForbiddenException('Something went wrong during sign-in.');
        }
    }
    signToken(userId, email) {
        const payload = {
            sub: userId,
            email,
        };
        console.log('JWT_SECRET:', this.config.get('JWT_SECRET'));
        const secret = this.config.get('JWT_SECRET');
        return this.jwt.signAsync(payload, {
            expiresIn: '30m',
            secret: secret,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map