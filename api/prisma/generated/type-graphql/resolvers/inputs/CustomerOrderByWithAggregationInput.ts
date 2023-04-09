import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CustomerCountOrderByAggregateInput } from "../inputs/CustomerCountOrderByAggregateInput";
import { CustomerMaxOrderByAggregateInput } from "../inputs/CustomerMaxOrderByAggregateInput";
import { CustomerMinOrderByAggregateInput } from "../inputs/CustomerMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("CustomerOrderByWithAggregationInput", {
  isAbstract: true
})
export class CustomerOrderByWithAggregationInput {
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
  dateCreated?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => CustomerCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: CustomerCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => CustomerMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: CustomerMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => CustomerMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: CustomerMinOrderByAggregateInput | undefined;
}
