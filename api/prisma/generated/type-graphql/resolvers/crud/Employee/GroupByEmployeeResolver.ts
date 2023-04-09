import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByEmployeeArgs } from "./args/GroupByEmployeeArgs";
import { Employee } from "../../../models/Employee";
import { EmployeeGroupBy } from "../../outputs/EmployeeGroupBy";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Employee)
export class GroupByEmployeeResolver {
  @TypeGraphQL.Query(_returns => [EmployeeGroupBy], {
    nullable: false
  })
  async groupByEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => GroupByEmployeeArgs) args: GroupByEmployeeArgs): Promise<EmployeeGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
