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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const jwt_1 = require("@nestjs/jwt");
const Prisma_service_1 = require("../../../../prisma/Prisma.service");
let AuthGuard = class AuthGuard {
  constructor(jwtService, prisma, config) {
    this.jwtService = jwtService;
    this.prisma = prisma;
    this.config = config;
  }
  async canActivate(context) {
    const gqlContext = graphql_1.GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const accessToken = req.headers.accessToken;
    const refreshToken = req.headers.refreshToken;
    if (!accessToken || !refreshToken) {
      throw new common_1.UnauthorizedException("");
    }
    if (accessToken) {
      const decoded = this.jwtService.verify(accessToken, {
        secret: this.config.get("ACCESS_TOKEN_SECRET"),
      });
      if (!decoded) {
        throw new common_1.UnauthorizedException("Invalid access token!");
      }
      await this.updateAccessToke(req);
    }
    return true;
  }
  async updateAccessToke(req) {
    try {
      const refreshTokenData = req.headers.refreshToken;
      const decoded = this.jwtService.verify(refreshTokenData, {
        secret: this.config.get("REFRESH_TOKEN_SECRET"),
      });
      if (!decoded) {
        throw new common_1.UnauthorizedException("Invalid refresh token!");
      }
      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });
      const accessToken = this.jwtService.sign(
        { id: user.id },
        {
          secret: this.config.get("ACCESS_TOKEN_SECRET"),
          expiresIn: "7d",
        },
      );
      const refreshToken = this.jwtService.sign(
        { id: user.id },
        {
          secret: this.config.get("ACCESS_TOKEN_SECRET"),
          expiresIn: "7d",
        },
      );
      req.headers.accessToken = accessToken;
      req.headers.refreshToken = refreshToken;
      req.user = user;
    } catch (error) {
      console.log(error);
    }
  }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [
      jwt_1.JwtService,
      Prisma_service_1.PrismaService,
      config_1.ConfigService,
    ]),
  ],
  AuthGuard,
);
//# sourceMappingURL=auth.guard.js.map
