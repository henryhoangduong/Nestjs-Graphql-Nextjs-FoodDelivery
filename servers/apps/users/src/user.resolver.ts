import { Args, Context, Mutation, Resolver, Query } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import {
  ActivationResponse,
  LoginResponse,
  RegisterResponse,
} from "./types/user.type";
import { User } from "./entities/user.entity";
import { ActivationDto, RegisterDto } from "./dto/user.dto";
import { BadGatewayException } from "@nestjs/common";

@Resolver("User")
export class UserResolvers {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args("registerInput") registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.email || !registerDto.name || !registerDto.password) {
      throw new BadGatewayException("Please fill in all fields");
    }
    const { activationToken } = await this.userService.register(
      registerDto,
      context.res,
    );
    return { activation_token: activationToken.token };
  }
  @Mutation(() => ActivationResponse)
  async activateUser(
    @Args("activationInput") activationDto: ActivationDto,
    @Context() context: { res: Response },
  ): Promise<ActivationResponse> {
    const user = await this.userService.activateUser(
      activationDto,
      context.res,
    );
    return { user: user.user };
  }

  @Mutation(() => LoginResponse)
  async Login(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<LoginResponse> {
    
    return await this.userService.login({ email, password });
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }
}
