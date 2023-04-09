import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeWhereInput } from "../inputs/EmployeeWhereInput";

@TypeGraphQL.InputType("EmployeeListRelationFilter", {
  isAbstract: true
})
export class EmployeeListRelationFilter {
  @TypeGraphQL.Field(_type => EmployeeWhereInput, {
    nullable: true
  })
  every?: EmployeeWhereInput | undefined;

  @TypeGraphQL.Field(_type => EmployeeWhereInput, {
    nullable: true
  })
  some?: EmployeeWhereInput | undefined;

  @TypeGraphQL.Field(_type => EmployeeWhereInput, {
    nullable: true
  })
  none?: EmployeeWhereInput | undefined;
}
