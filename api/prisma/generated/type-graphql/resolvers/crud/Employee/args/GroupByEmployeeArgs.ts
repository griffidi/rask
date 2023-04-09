import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EmployeeOrderByWithAggregationInput } from "../../../inputs/EmployeeOrderByWithAggregationInput";
import { EmployeeScalarWhereWithAggregatesInput } from "../../../inputs/EmployeeScalarWhereWithAggregatesInput";
import { EmployeeWhereInput } from "../../../inputs/EmployeeWhereInput";
import { EmployeeScalarFieldEnum } from "../../../../enums/EmployeeScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByEmployeeArgs {
  @TypeGraphQL.Field(_type => EmployeeWhereInput, {
    nullable: true
  })
  where?: EmployeeWhereInput | undefined;

  @TypeGraphQL.Field(_type => [EmployeeOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: EmployeeOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "firstName" | "lastName" | "email" | "gender" | "streetAddress" | "city" | "state" | "zipCode" | "jobTitle" | "departmentId" | "dateStarted">;

  @TypeGraphQL.Field(_type => EmployeeScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: EmployeeScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
