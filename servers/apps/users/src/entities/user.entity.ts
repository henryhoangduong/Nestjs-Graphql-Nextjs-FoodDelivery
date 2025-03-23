import { ObjectType, Field, ID } from "@nestjs/graphql";
@ObjectType()
export class Avatar  {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    url: string;
    
    @Field(() => String)
    userId: string;
}

@ObjectType()
export class User {
    @Field()
    id: string;
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;
}
