import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "prisma/Prisma.service";
import { Observable } from "rxjs";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const accessToken = req.headers.accessToken as string;
    const refreshToken = req.headers.refreshToken as string;
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException("");
    }

    if (accessToken) {
      const decoded = this.jwtService.verify(accessToken, {
        secret: this.config.get<string>("ACCESS_TOKEN_SECRET"),
      });
      if (!decoded) {
        throw new UnauthorizedException("Invalid access token!");
      }
      await this.updateAccessToke(req);
    }
    return true;
  }

  private async updateAccessToke(req: any): Promise<void> {
    try {
      const refreshTokenData = req.headers.refreshToken as string;
      const decoded = this.jwtService.verify(refreshTokenData, {
        secret: this.config.get<string>("REFRESH_TOKEN_SECRET"),
      });
      if (!decoded) {
        throw new UnauthorizedException("Invalid refresh token!");
      }
      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });
      const accessToken = this.jwtService.sign(
        { id: user.id },
        {
          secret: this.config.get<string>("ACCESS_TOKEN_SECRET"),
          expiresIn: "7d",
        },
      );
      const refreshToken = this.jwtService.sign(
        { id: user.id },
        {
          secret: this.config.get<string>("ACCESS_TOKEN_SECRET"),
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
}
