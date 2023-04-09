import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeOrderByRelationAggregateInput } from "../inputs/EmployeeOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("DepartmentOrderByWithRelationInput", {
  isAbstract: true
})
export class DepartmentOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => EmployeeOrderByRelationAggregateInput, {
    nullable: true
  })
  employees?: EmployeeOrderByRelationAggregateInput | undefined;
}
