import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeUpdateWithoutDepartmentInput } from "../inputs/EmployeeUpdateWithoutDepartmentInput";
import { EmployeeWhereUniqueInput } from "../inputs/EmployeeWhereUniqueInput";

@TypeGraphQL.InputType("EmployeeUpdateWithWhereUniqueWithoutDepartmentInput", {
  isAbstract: true
})
export class EmployeeUpdateWithWhereUniqueWithoutDepartmentInput {
  @TypeGraphQL.Field(_type => EmployeeWhereUniqueInput, {
    nullable: false
  })
  where!: EmployeeWhereUniqueInput;

  @TypeGraphQL.Field(_type => EmployeeUpdateWithoutDepartmentInput, {
    nullable: false
  })
  data!: EmployeeUpdateWithoutDepartmentInput;
}
