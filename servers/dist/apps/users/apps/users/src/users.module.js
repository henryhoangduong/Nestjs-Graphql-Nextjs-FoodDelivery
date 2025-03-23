"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const Prisma_service_1 = require("../../../prisma/Prisma.service");
const user_resolver_1 = require("./user.resolver");
const default_1 = require("@apollo/server/plugin/landingPage/default");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloFederationDriver,
                plugins: [(0, default_1.ApolloServerPluginLandingPageLocalDefault)()],
                autoSchemaFile: { federation: 2 },
                playground: false,
            }),
        ],
        controllers: [],
        providers: [
            users_service_1.UsersService,
            config_1.ConfigService,
            jwt_1.JwtService,
            Prisma_service_1.PrismaService,
            user_resolver_1.UserResolvers,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map