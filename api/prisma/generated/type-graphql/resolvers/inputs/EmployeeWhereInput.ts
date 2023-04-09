import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { DepartmentRelationFilter } from "../inputs/DepartmentRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("EmployeeWhereInput", {
  isAbstract: true
})
export class EmployeeWhereInput {
  @TypeGraphQL.Field(_type => [EmployeeWhereInput], {
    nullable: true
  })
  AND?: EmployeeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeWhereInput], {
    nullable: true
  })
  OR?: EmployeeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeWhereInput], {
    nullable: true
  })
  NOT?: EmployeeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  firstName?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  lastName?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  email?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  gender?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  streetAddress?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  city?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  state?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  zipCode?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  jobTitle?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  departmentId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  dateStarted?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DepartmentRelationFilter, {
    nullable: true
  })
  department?: DepartmentRelationFilter | undefined;
}
