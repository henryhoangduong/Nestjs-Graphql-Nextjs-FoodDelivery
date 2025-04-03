import { ActivationDto, LoginDto, RegisterDto } from "./dto/user.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { JwtService, JwtVerifyOptions } from "@nestjs/jwt";
import { PrismaService } from "prisma/Prisma.service";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { EmailService } from "./email/email.service";
import { TokenSender } from "./utils/sendToken";
import { LoginResponse } from "./types/user.type";

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
    const isEmailExist = await this.prisma.user.findFirst({
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
    return { activationToken, response };
  }
  async activateUser(activationDto: ActivationDto, response: Response) {
    const { activationToken, activationCode } = activationDto;
    const newUser: { user: UserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>("ACTIVATION_SECRET"),
      } as JwtVerifyOptions) as { user: UserData; activationCode: string };
    if (newUser.activationCode !== activationCode) {
      throw new Error("Invalid activation code");
    }
    const { name, email, password, phone_number } = newUser.user;
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existUser) {
      throw new Error("User already exists");
    }
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        phone_number,
      },
    });
    return { user, response };
  }

  async login(loginDto: LoginDto):Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user && (await this.comparePassword(password, user.password))) {
      const tokenSender = new TokenSender(this.configService, this.jwtService);
      return tokenSender.sendToken(user);
    } else {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message:"Invalid email or password"
        }
      }
    }
  }
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async createAvtivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
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
