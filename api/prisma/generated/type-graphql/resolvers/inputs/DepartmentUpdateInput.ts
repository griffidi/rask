import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeUpdateManyWithoutDepartmentNestedInput } from "../inputs/EmployeeUpdateManyWithoutDepartmentNestedInput";

@TypeGraphQL.InputType("DepartmentUpdateInput", {
  isAbstract: true
})
export class DepartmentUpdateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name?: string | undefined;

  @TypeGraphQL.Field(_type => EmployeeUpdateManyWithoutDepartmentNestedInput, {
    nullable: true
  })
  employees?: EmployeeUpdateManyWithoutDepartmentNestedInput | undefined;
}
