import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { RoleCreateWithoutUsersInput } from "../inputs/RoleCreateWithoutUsersInput";
import { RoleWhereUniqueInput } from "../inputs/RoleWhereUniqueInput";

@TypeGraphQL.InputType("RoleCreateOrConnectWithoutUsersInput", {
  isAbstract: true
})
export class RoleCreateOrConnectWithoutUsersInput {
  @TypeGraphQL.Field(_type => RoleWhereUniqueInput, {
    nullable: false
  })
  where!: RoleWhereUniqueInput;

  @TypeGraphQL.Field(_type => RoleCreateWithoutUsersInput, {
    nullable: false
  })
  create!: RoleCreateWithoutUsersInput;
}
