import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeCountOrderByAggregateInput } from "../inputs/EmployeeCountOrderByAggregateInput";
import { EmployeeMaxOrderByAggregateInput } from "../inputs/EmployeeMaxOrderByAggregateInput";
import { EmployeeMinOrderByAggregateInput } from "../inputs/EmployeeMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("EmployeeOrderByWithAggregationInput", {
  isAbstract: true
})
export class EmployeeOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  firstName?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  lastName?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  email?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  gender?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  streetAddress?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  city?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  state?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  zipCode?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  jobTitle?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  departmentId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  dateStarted?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => EmployeeCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: EmployeeCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => EmployeeMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: EmployeeMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => EmployeeMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: EmployeeMinOrderByAggregateInput | undefined;
}
