import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DepartmentUpdateManyMutationInput } from "../../../inputs/DepartmentUpdateManyMutationInput";
import { DepartmentWhereInput } from "../../../inputs/DepartmentWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyDepartmentArgs {
  @TypeGraphQL.Field(_type => DepartmentUpdateManyMutationInput, {
    nullable: false
  })
  data!: DepartmentUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => DepartmentWhereInput, {
    nullable: true
  })
  where?: DepartmentWhereInput | undefined;
}
