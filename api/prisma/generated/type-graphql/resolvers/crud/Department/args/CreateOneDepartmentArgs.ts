import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DepartmentCreateInput } from "../../../inputs/DepartmentCreateInput";

@TypeGraphQL.ArgsType()
export class CreateOneDepartmentArgs {
  @TypeGraphQL.Field(_type => DepartmentCreateInput, {
    nullable: false
  })
  data!: DepartmentCreateInput;
}
