import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EmployeeCreateInput } from "../../../inputs/EmployeeCreateInput";
import { EmployeeUpdateInput } from "../../../inputs/EmployeeUpdateInput";
import { EmployeeWhereUniqueInput } from "../../../inputs/EmployeeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneEmployeeArgs {
  @TypeGraphQL.Field(_type => EmployeeWhereUniqueInput, {
    nullable: false
  })
  where!: EmployeeWhereUniqueInput;

  @TypeGraphQL.Field(_type => EmployeeCreateInput, {
    nullable: false
  })
  create!: EmployeeCreateInput;

  @TypeGraphQL.Field(_type => EmployeeUpdateInput, {
    nullable: false
  })
  update!: EmployeeUpdateInput;
}
