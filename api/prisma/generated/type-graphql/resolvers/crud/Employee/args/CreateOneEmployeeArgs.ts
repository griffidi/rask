import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EmployeeCreateInput } from "../../../inputs/EmployeeCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneEmployeeArgs {
  @TypeGraphQL.Field(_type => EmployeeCreateInput, {
    nullable: false
  })
  data!: EmployeeCreateInput;
}
