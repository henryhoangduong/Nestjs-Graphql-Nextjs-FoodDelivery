import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { GraphQLModule } from "@nestjs/graphql";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "prisma/Prisma.service";
import { UserResolvers } from "./user.resolver";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { EmailModule } from "./email/email.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:[".env"]
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],

      autoSchemaFile: { federation: 2 },
      playground: false,
    }),
    EmailModule,
  ],
  providers: [
    UsersService,
    ConfigService,
    JwtService,
    PrismaService,
    UserResolvers,
  ],
})
export class UsersModule {}
