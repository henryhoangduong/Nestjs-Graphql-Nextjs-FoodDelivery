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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const Prisma_service_1 = require("../../../prisma/Prisma.service");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(jwtService, prisma, config) {
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.config = config;
    }
    async register(registerDto, response) {
        const { name, password, email } = registerDto;
        const user = {
            name,
            email,
            password,
        };
        await this.prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        return user;
    }
    async login(loginDto) {
        const { password, email } = loginDto;
        const user = {
            email,
            password,
        };
        return user;
    }
    async getUsers() {
        return this.prisma.user.findMany();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        Prisma_service_1.PrismaService,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map