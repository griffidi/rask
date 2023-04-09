import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EmployeeUpdateInput } from "../../../inputs/EmployeeUpdateInput";
import { EmployeeWhereUniqueInput } from "../../../inputs/EmployeeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneEmployeeArgs {
  @TypeGraphQL.Field(_type => EmployeeUpdateInput, {
    nullable: false
  })
  data!: EmployeeUpdateInput;

  @TypeGraphQL.Field(_type => EmployeeWhereUniqueInput, {
    nullable: false
  })
  where!: EmployeeWhereUniqueInput;
}
