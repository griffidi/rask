import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DepartmentOrderByWithAggregationInput } from "../../../inputs/DepartmentOrderByWithAggregationInput";
import { DepartmentScalarWhereWithAggregatesInput } from "../../../inputs/DepartmentScalarWhereWithAggregatesInput";
import { DepartmentWhereInput } from "../../../inputs/DepartmentWhereInput";
import { DepartmentScalarFieldEnum } from "../../../../enums/DepartmentScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByDepartmentArgs {
  @TypeGraphQL.Field(_type => DepartmentWhereInput, {
    nullable: true
  })
  where?: DepartmentWhereInput | undefined;

  @TypeGraphQL.Field(_type => [DepartmentOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: DepartmentOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [DepartmentScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "name">;

  @TypeGraphQL.Field(_type => DepartmentScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: DepartmentScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
