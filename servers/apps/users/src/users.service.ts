import { LoginDto, RegisterDto } from "./dto/user.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "prisma/Prisma.service";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { EmailService } from "./email/email.service";

interface UserData {
  name: string;
  email: string;
  password: string;
  phone_number: number;
}
@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto, response: Response) {
    const { name, password, email, phone_number } = registerDto;

    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    const isPhoneNumberExist = await this.prisma.user.findUnique({
      where: {
        phone_number: phone_number,
      },
    });
    if (isEmailExist) {
      throw new BadRequestException("user already exists");
    }
    if (isPhoneNumberExist) {
      throw new BadRequestException("phone number already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name: name,
      email: email,
      password: hashedPassword,
      phone_number: phone_number,
    };

    const activationToken = await this.createAvtivationToken(user);
    const activationCode = activationToken.activationCode;
    await this.emailService.sendEmail({
      email,
      subject: "Activate your account",
      template: "./activation-mail",
      name,
      activationCode,
    });
    return { user, response };
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
  createAvtivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() + 9000).toString();
    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>("ACTIVATION_SECRET"),
        expiresIn: "5m",
      },
    );
    return { token, activationCode };
  }
}
