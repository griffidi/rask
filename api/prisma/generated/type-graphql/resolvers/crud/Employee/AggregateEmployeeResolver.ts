import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateEmployeeArgs } from "./args/AggregateEmployeeArgs";
import { Employee } from "../../../models/Employee";
import { AggregateEmployee } from "../../outputs/AggregateEmployee";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Employee)
export class AggregateEmployeeResolver {
  @TypeGraphQL.Query(_returns => AggregateEmployee, {
    nullable: false
  })
  async aggregateEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => AggregateEmployeeArgs) args: AggregateEmployeeArgs): Promise<AggregateEmployee> {
    return getPrismaFromContext(ctx).employee.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
