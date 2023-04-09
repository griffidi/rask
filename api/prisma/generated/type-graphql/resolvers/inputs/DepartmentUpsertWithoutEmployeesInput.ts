import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DepartmentCreateWithoutEmployeesInput } from "../inputs/DepartmentCreateWithoutEmployeesInput";
import { DepartmentUpdateWithoutEmployeesInput } from "../inputs/DepartmentUpdateWithoutEmployeesInput";

@TypeGraphQL.InputType("DepartmentUpsertWithoutEmployeesInput", {
  isAbstract: true
})
export class DepartmentUpsertWithoutEmployeesInput {
  @TypeGraphQL.Field(_type => DepartmentUpdateWithoutEmployeesInput, {
    nullable: false
  })
  update!: DepartmentUpdateWithoutEmployeesInput;

  @TypeGraphQL.Field(_type => DepartmentCreateWithoutEmployeesInput, {
    nullable: false
  })
  create!: DepartmentCreateWithoutEmployeesInput;
}
