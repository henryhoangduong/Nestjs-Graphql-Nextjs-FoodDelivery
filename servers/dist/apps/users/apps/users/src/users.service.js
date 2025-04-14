"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const Prisma_service_1 = require("../../../prisma/Prisma.service");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const email_service_1 = require("./email/email.service");
const sendToken_1 = require("./utils/sendToken");
let UsersService = class UsersService {
  constructor(jwtService, prisma, configService, emailService) {
    this.jwtService = jwtService;
    this.prisma = prisma;
    this.configService = configService;
    this.emailService = emailService;
  }
  async register(registerDto, response) {
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
      throw new common_1.BadRequestException("user already exists");
    }
    if (isPhoneNumberExist) {
      throw new common_1.BadRequestException("phone number already exists");
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
  async activateUser(activationDto, response) {
    const { activationToken, activationCode } = activationDto;
    const newUser = this.jwtService.verify(activationToken, {
      secret: this.configService.get("ACTIVATION_SECRET"),
    });
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
  async login(loginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user && (await this.comparePassword(password, user.password))) {
      const tokenSender = new sendToken_1.TokenSender(
        this.configService,
        this.jwtService,
      );
      return tokenSender.sendToken(user);
    } else {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message: "Invalid email or password",
        },
      };
    }
  }
  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
  async getUsers() {
    return this.prisma.user.findMany();
  }
  async getLoggedInUser(req) {
    const user = req.user;
    const refreshToken = req.refreshToken;
    const accessToken = req.accessToken;
    console.log({ user, refreshToken, accessToken });
  }
  async createAvtivationToken(user) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get("ACTIVATION_SECRET"),
        expiresIn: "5m",
      },
    );
    return { token, activationCode };
  }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [
      jwt_1.JwtService,
      Prisma_service_1.PrismaService,
      config_1.ConfigService,
      email_service_1.EmailService,
    ]),
  ],
  UsersService,
);
//# sourceMappingURL=users.service.js.map
