import { Args, Context, Mutation, Resolver, Query } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { LoginResponse, RegisterResponse } from "./types/user.type";
import { User } from "./entities/user.entity";
import { RegisterDto } from "./dto/user.dto";
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
    const user = await this.userService.register(registerDto, context.res);
    return { user };
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }
}
