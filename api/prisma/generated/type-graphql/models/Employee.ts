import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Department } from "../models/Department";

@TypeGraphQL.ObjectType("Employee", {
  isAbstract: true
})
export class Employee {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  firstName!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  lastName!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  gender!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  streetAddress!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  city!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  state!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  zipCode!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  jobTitle!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  departmentId!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  dateStarted!: Date;

  department?: Department;
}
