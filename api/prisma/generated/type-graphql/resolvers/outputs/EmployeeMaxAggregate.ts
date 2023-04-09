import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("EmployeeMaxAggregate", {
  isAbstract: true
})
export class EmployeeMaxAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  firstName!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  lastName!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  gender!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  streetAddress!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  city!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  state!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  zipCode!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  jobTitle!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  departmentId!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  dateStarted!: Date | null;
}
