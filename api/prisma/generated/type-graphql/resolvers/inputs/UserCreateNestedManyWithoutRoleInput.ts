import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutRoleInput } from "../inputs/UserCreateOrConnectWithoutRoleInput";
import { UserCreateWithoutRoleInput } from "../inputs/UserCreateWithoutRoleInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserCreateNestedManyWithoutRoleInput", {
  isAbstract: true
})
export class UserCreateNestedManyWithoutRoleInput {
  @TypeGraphQL.Field(_type => [UserCreateWithoutRoleInput], {
    nullable: true
  })
  create?: UserCreateWithoutRoleInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserCreateOrConnectWithoutRoleInput], {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutRoleInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereUniqueInput], {
    nullable: true
  })
  connect?: UserWhereUniqueInput[] | undefined;
}
