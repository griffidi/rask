import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { RoleUpdateOneRequiredWithoutUsersNestedInput } from "../inputs/RoleUpdateOneRequiredWithoutUsersNestedInput";

@TypeGraphQL.InputType("UserUpdateInput", {
  isAbstract: true
})
export class UserUpdateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  userName?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  password?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  firstName?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  lastName?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  dateCreated?: Date | undefined;

  @TypeGraphQL.Field(_type => RoleUpdateOneRequiredWithoutUsersNestedInput, {
    nullable: true
  })
  role?: RoleUpdateOneRequiredWithoutUsersNestedInput | undefined;
}
