import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserUpdateManyWithoutRoleNestedInput } from "../inputs/UserUpdateManyWithoutRoleNestedInput";

@TypeGraphQL.InputType("RoleUpdateInput", {
  isAbstract: true
})
export class RoleUpdateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  description?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  dateCreated?: Date | undefined;

  @TypeGraphQL.Field(_type => UserUpdateManyWithoutRoleNestedInput, {
    nullable: true
  })
  users?: UserUpdateManyWithoutRoleNestedInput | undefined;
}
