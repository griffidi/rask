import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DepartmentWhereUniqueInput } from "../../../inputs/DepartmentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueDepartmentOrThrowArgs {
  @TypeGraphQL.Field(_type => DepartmentWhereUniqueInput, {
    nullable: false
  })
  where!: DepartmentWhereUniqueInput;
}
