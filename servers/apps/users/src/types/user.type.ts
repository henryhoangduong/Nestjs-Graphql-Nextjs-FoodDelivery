import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class ErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  activation_token: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field({ nullable: true })
  accessToken?: string | null;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LogoutResponse {
  @Field()
  message?: string;
}

@ObjectType()
export class ActivationResponse {
  @Field(() => User, { nullable: true })
  user: User | any;

  @Field(() => ErrorType, { nullable: true })
  errorType?: ErrorType;
}
