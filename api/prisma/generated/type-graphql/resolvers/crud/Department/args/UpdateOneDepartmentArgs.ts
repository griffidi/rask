import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DepartmentUpdateInput } from "../../../inputs/DepartmentUpdateInput";
import { DepartmentWhereUniqueInput } from "../../../inputs/DepartmentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneDepartmentArgs {
  @TypeGraphQL.Field(_type => DepartmentUpdateInput, {
    nullable: false
  })
  data!: DepartmentUpdateInput;

  @TypeGraphQL.Field(_type => DepartmentWhereUniqueInput, {
    nullable: false
  })
  where!: DepartmentWhereUniqueInput;
}
