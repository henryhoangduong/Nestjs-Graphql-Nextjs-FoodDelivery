import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { GraphQLModule } from "@nestjs/graphql";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "prisma/Prisma.service";
import { UserResolvers } from "./user.resolver";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],

      autoSchemaFile: { federation: 2 },
      playground: false,
    }),
  ],
  controllers: [],
  providers: [
    UsersService,
    ConfigService,
    JwtService,
    PrismaService,
    UserResolvers,
  ],
})
export class UsersModule {}
