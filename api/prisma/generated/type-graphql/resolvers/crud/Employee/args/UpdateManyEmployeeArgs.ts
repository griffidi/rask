import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EmployeeUpdateManyMutationInput } from "../../../inputs/EmployeeUpdateManyMutationInput";
import { EmployeeWhereInput } from "../../../inputs/EmployeeWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyEmployeeArgs {
  @TypeGraphQL.Field(_type => EmployeeUpdateManyMutationInput, {
    nullable: false
  })
  data!: EmployeeUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => EmployeeWhereInput, {
    nullable: true
  })
  where?: EmployeeWhereInput | undefined;
}
