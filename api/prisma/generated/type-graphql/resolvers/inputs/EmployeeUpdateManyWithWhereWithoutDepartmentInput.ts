import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeScalarWhereInput } from "../inputs/EmployeeScalarWhereInput";
import { EmployeeUpdateManyMutationInput } from "../inputs/EmployeeUpdateManyMutationInput";

@TypeGraphQL.InputType("EmployeeUpdateManyWithWhereWithoutDepartmentInput", {
  isAbstract: true
})
export class EmployeeUpdateManyWithWhereWithoutDepartmentInput {
  @TypeGraphQL.Field(_type => EmployeeScalarWhereInput, {
    nullable: false
  })
  where!: EmployeeScalarWhereInput;

  @TypeGraphQL.Field(_type => EmployeeUpdateManyMutationInput, {
    nullable: false
  })
  data!: EmployeeUpdateManyMutationInput;
}
