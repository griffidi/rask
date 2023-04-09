import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DepartmentCreateWithoutEmployeesInput } from "../inputs/DepartmentCreateWithoutEmployeesInput";
import { DepartmentWhereUniqueInput } from "../inputs/DepartmentWhereUniqueInput";

@TypeGraphQL.InputType("DepartmentCreateOrConnectWithoutEmployeesInput", {
  isAbstract: true
})
export class DepartmentCreateOrConnectWithoutEmployeesInput {
  @TypeGraphQL.Field(_type => DepartmentWhereUniqueInput, {
    nullable: false
  })
  where!: DepartmentWhereUniqueInput;

  @TypeGraphQL.Field(_type => DepartmentCreateWithoutEmployeesInput, {
    nullable: false
  })
  create!: DepartmentCreateWithoutEmployeesInput;
}
