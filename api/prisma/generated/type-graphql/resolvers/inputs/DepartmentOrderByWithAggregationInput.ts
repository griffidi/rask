import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DepartmentCountOrderByAggregateInput } from "../inputs/DepartmentCountOrderByAggregateInput";
import { DepartmentMaxOrderByAggregateInput } from "../inputs/DepartmentMaxOrderByAggregateInput";
import { DepartmentMinOrderByAggregateInput } from "../inputs/DepartmentMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("DepartmentOrderByWithAggregationInput", {
  isAbstract: true
})
export class DepartmentOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => DepartmentCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: DepartmentCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => DepartmentMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: DepartmentMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => DepartmentMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: DepartmentMinOrderByAggregateInput | undefined;
}
