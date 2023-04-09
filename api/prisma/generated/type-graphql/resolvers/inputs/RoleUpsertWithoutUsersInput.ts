import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { RoleCreateWithoutUsersInput } from "../inputs/RoleCreateWithoutUsersInput";
import { RoleUpdateWithoutUsersInput } from "../inputs/RoleUpdateWithoutUsersInput";

@TypeGraphQL.InputType("RoleUpsertWithoutUsersInput", {
  isAbstract: true
})
export class RoleUpsertWithoutUsersInput {
  @TypeGraphQL.Field(_type => RoleUpdateWithoutUsersInput, {
    nullable: false
  })
  update!: RoleUpdateWithoutUsersInput;

  @TypeGraphQL.Field(_type => RoleCreateWithoutUsersInput, {
    nullable: false
  })
  create!: RoleCreateWithoutUsersInput;
}
