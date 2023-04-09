import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EmployeeWhereUniqueInput } from "../../../inputs/EmployeeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueEmployeeArgs {
  @TypeGraphQL.Field(_type => EmployeeWhereUniqueInput, {
    nullable: false
  })
  where!: EmployeeWhereUniqueInput;
}
