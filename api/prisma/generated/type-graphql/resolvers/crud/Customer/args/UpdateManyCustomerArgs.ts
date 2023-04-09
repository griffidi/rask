import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CustomerUpdateManyMutationInput } from "../../../inputs/CustomerUpdateManyMutationInput";
import { CustomerWhereInput } from "../../../inputs/CustomerWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyCustomerArgs {
  @TypeGraphQL.Field(_type => CustomerUpdateManyMutationInput, {
    nullable: false
  })
  data!: CustomerUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => CustomerWhereInput, {
    nullable: true
  })
  where?: CustomerWhereInput | undefined;
}
