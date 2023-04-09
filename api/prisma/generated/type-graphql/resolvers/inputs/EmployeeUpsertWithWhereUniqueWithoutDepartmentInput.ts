import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeCreateWithoutDepartmentInput } from "../inputs/EmployeeCreateWithoutDepartmentInput";
import { EmployeeUpdateWithoutDepartmentInput } from "../inputs/EmployeeUpdateWithoutDepartmentInput";
import { EmployeeWhereUniqueInput } from "../inputs/EmployeeWhereUniqueInput";

@TypeGraphQL.InputType("EmployeeUpsertWithWhereUniqueWithoutDepartmentInput", {
  isAbstract: true
})
export class EmployeeUpsertWithWhereUniqueWithoutDepartmentInput {
  @TypeGraphQL.Field(_type => EmployeeWhereUniqueInput, {
    nullable: false
  })
  where!: EmployeeWhereUniqueInput;

  @TypeGraphQL.Field(_type => EmployeeUpdateWithoutDepartmentInput, {
    nullable: false
  })
  update!: EmployeeUpdateWithoutDepartmentInput;

  @TypeGraphQL.Field(_type => EmployeeCreateWithoutDepartmentInput, {
    nullable: false
  })
  create!: EmployeeCreateWithoutDepartmentInput;
}
