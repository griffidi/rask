import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeUpdateManyWithoutDepartmentNestedInput } from "../inputs/EmployeeUpdateManyWithoutDepartmentNestedInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("DepartmentUpdateInput", {
  isAbstract: true
})
export class DepartmentUpdateInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  id?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EmployeeUpdateManyWithoutDepartmentNestedInput, {
    nullable: true
  })
  employees?: EmployeeUpdateManyWithoutDepartmentNestedInput | undefined;
}
