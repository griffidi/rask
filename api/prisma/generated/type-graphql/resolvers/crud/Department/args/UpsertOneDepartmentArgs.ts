import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DepartmentCreateInput } from "../../../inputs/DepartmentCreateInput";
import { DepartmentUpdateInput } from "../../../inputs/DepartmentUpdateInput";
import { DepartmentWhereUniqueInput } from "../../../inputs/DepartmentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneDepartmentArgs {
  @TypeGraphQL.Field(_type => DepartmentWhereUniqueInput, {
    nullable: false
  })
  where!: DepartmentWhereUniqueInput;

  @TypeGraphQL.Field(_type => DepartmentCreateInput, {
    nullable: false
  })
  create!: DepartmentCreateInput;

  @TypeGraphQL.Field(_type => DepartmentUpdateInput, {
    nullable: false
  })
  update!: DepartmentUpdateInput;
}
