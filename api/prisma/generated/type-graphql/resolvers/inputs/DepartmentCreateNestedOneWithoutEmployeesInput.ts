import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DepartmentCreateOrConnectWithoutEmployeesInput } from "../inputs/DepartmentCreateOrConnectWithoutEmployeesInput";
import { DepartmentCreateWithoutEmployeesInput } from "../inputs/DepartmentCreateWithoutEmployeesInput";
import { DepartmentWhereUniqueInput } from "../inputs/DepartmentWhereUniqueInput";

@TypeGraphQL.InputType("DepartmentCreateNestedOneWithoutEmployeesInput", {
  isAbstract: true
})
export class DepartmentCreateNestedOneWithoutEmployeesInput {
  @TypeGraphQL.Field(_type => DepartmentCreateWithoutEmployeesInput, {
    nullable: true
  })
  create?: DepartmentCreateWithoutEmployeesInput | undefined;

  @TypeGraphQL.Field(_type => DepartmentCreateOrConnectWithoutEmployeesInput, {
    nullable: true
  })
  connectOrCreate?: DepartmentCreateOrConnectWithoutEmployeesInput | undefined;

  @TypeGraphQL.Field(_type => DepartmentWhereUniqueInput, {
    nullable: true
  })
  connect?: DepartmentWhereUniqueInput | undefined;
}
