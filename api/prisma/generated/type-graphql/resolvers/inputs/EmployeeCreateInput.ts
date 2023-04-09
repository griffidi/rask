import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DepartmentCreateNestedOneWithoutEmployeesInput } from "../inputs/DepartmentCreateNestedOneWithoutEmployeesInput";

@TypeGraphQL.InputType("EmployeeCreateInput", {
  isAbstract: true
})
export class EmployeeCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

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

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  dateStarted?: Date | undefined;

  @TypeGraphQL.Field(_type => DepartmentCreateNestedOneWithoutEmployeesInput, {
    nullable: false
  })
  department!: DepartmentCreateNestedOneWithoutEmployeesInput;
}
