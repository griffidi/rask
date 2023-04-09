import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CustomerUpdateInput } from "../../../inputs/CustomerUpdateInput";
import { CustomerWhereUniqueInput } from "../../../inputs/CustomerWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateOneCustomerArgs {
  @TypeGraphQL.Field(_type => CustomerUpdateInput, {
    nullable: false
  })
  data!: CustomerUpdateInput;

  @TypeGraphQL.Field(_type => CustomerWhereUniqueInput, {
    nullable: false
  })
  where!: CustomerWhereUniqueInput;
}
