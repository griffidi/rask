import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("DepartmentScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class DepartmentScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [DepartmentScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: DepartmentScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [DepartmentScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: DepartmentScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [DepartmentScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: DepartmentScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  name?: StringWithAggregatesFilter | undefined;
}
