import { LoginDto, RegisterDto } from "./dto/user.dto";
import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "prisma/Prisma.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async register(registerDto: RegisterDto, response: Response) {
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
  async login(loginDto: LoginDto) {
    const { password, email } = loginDto;
    const user = {
      email,
      password,
    };
    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
