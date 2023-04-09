import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DepartmentWhereInput } from "../../../inputs/DepartmentWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyDepartmentArgs {
  @TypeGraphQL.Field(_type => DepartmentWhereInput, {
    nullable: true
  })
  where?: DepartmentWhereInput | undefined;
}
