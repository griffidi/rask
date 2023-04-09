import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("EmployeeUpdateManyMutationInput", {
  isAbstract: true
})
export class EmployeeUpdateManyMutationInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  firstName?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  lastName?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  gender?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  streetAddress?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  city?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  state?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  zipCode?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  jobTitle?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  dateStarted?: Date | undefined;
}