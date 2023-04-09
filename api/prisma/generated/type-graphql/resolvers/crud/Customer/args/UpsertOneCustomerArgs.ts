import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CustomerCreateInput } from "../../../inputs/CustomerCreateInput";
import { CustomerUpdateInput } from "../../../inputs/CustomerUpdateInput";
import { CustomerWhereUniqueInput } from "../../../inputs/CustomerWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertOneCustomerArgs {
  @TypeGraphQL.Field(_type => CustomerWhereUniqueInput, {
    nullable: false
  })
  where!: CustomerWhereUniqueInput;

  @TypeGraphQL.Field(_type => CustomerCreateInput, {
    nullable: false
  })
  create!: CustomerCreateInput;

  @TypeGraphQL.Field(_type => CustomerUpdateInput, {
    nullable: false
  })
  update!: CustomerUpdateInput;
}
