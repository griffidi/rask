import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeCreateWithoutDepartmentInput } from "../inputs/EmployeeCreateWithoutDepartmentInput";
import { EmployeeWhereUniqueInput } from "../inputs/EmployeeWhereUniqueInput";

@TypeGraphQL.InputType("EmployeeCreateOrConnectWithoutDepartmentInput", {
  isAbstract: true
})
export class EmployeeCreateOrConnectWithoutDepartmentInput {
  @TypeGraphQL.Field(_type => EmployeeWhereUniqueInput, {
    nullable: false
  })
  where!: EmployeeWhereUniqueInput;

  @TypeGraphQL.Field(_type => EmployeeCreateWithoutDepartmentInput, {
    nullable: false
  })
  create!: EmployeeCreateWithoutDepartmentInput;
}
