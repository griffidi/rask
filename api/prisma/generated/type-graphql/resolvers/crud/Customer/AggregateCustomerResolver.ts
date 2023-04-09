import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateCustomerArgs } from "./args/AggregateCustomerArgs";
import { Customer } from "../../../models/Customer";
import { AggregateCustomer } from "../../outputs/AggregateCustomer";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Customer)
export class AggregateCustomerResolver {
  @TypeGraphQL.Query(_returns => AggregateCustomer, {
    nullable: false
  })
  async aggregateCustomer(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => AggregateCustomerArgs) args: AggregateCustomerArgs): Promise<AggregateCustomer> {
    return getPrismaFromContext(ctx).customer.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
