import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeCreateOrConnectWithoutDepartmentInput } from "../inputs/EmployeeCreateOrConnectWithoutDepartmentInput";
import { EmployeeCreateWithoutDepartmentInput } from "../inputs/EmployeeCreateWithoutDepartmentInput";
import { EmployeeWhereUniqueInput } from "../inputs/EmployeeWhereUniqueInput";

@TypeGraphQL.InputType("EmployeeCreateNestedManyWithoutDepartmentInput", {
  isAbstract: true
})
export class EmployeeCreateNestedManyWithoutDepartmentInput {
  @TypeGraphQL.Field(_type => [EmployeeCreateWithoutDepartmentInput], {
    nullable: true
  })
  create?: EmployeeCreateWithoutDepartmentInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeCreateOrConnectWithoutDepartmentInput], {
    nullable: true
  })
  connectOrCreate?: EmployeeCreateOrConnectWithoutDepartmentInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeWhereUniqueInput], {
    nullable: true
  })
  connect?: EmployeeWhereUniqueInput[] | undefined;
}
