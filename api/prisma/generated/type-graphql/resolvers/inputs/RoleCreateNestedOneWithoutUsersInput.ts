import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { RoleCreateOrConnectWithoutUsersInput } from "../inputs/RoleCreateOrConnectWithoutUsersInput";
import { RoleCreateWithoutUsersInput } from "../inputs/RoleCreateWithoutUsersInput";
import { RoleWhereUniqueInput } from "../inputs/RoleWhereUniqueInput";

@TypeGraphQL.InputType("RoleCreateNestedOneWithoutUsersInput", {
  isAbstract: true
})
export class RoleCreateNestedOneWithoutUsersInput {
  @TypeGraphQL.Field(_type => RoleCreateWithoutUsersInput, {
    nullable: true
  })
  create?: RoleCreateWithoutUsersInput | undefined;

  @TypeGraphQL.Field(_type => RoleCreateOrConnectWithoutUsersInput, {
    nullable: true
  })
  connectOrCreate?: RoleCreateOrConnectWithoutUsersInput | undefined;

  @TypeGraphQL.Field(_type => RoleWhereUniqueInput, {
    nullable: true
  })
  connect?: RoleWhereUniqueInput | undefined;
}
