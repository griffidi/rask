import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByDepartmentArgs } from "./args/GroupByDepartmentArgs";
import { Department } from "../../../models/Department";
import { DepartmentGroupBy } from "../../outputs/DepartmentGroupBy";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Department)
export class GroupByDepartmentResolver {
  @TypeGraphQL.Query(_returns => [DepartmentGroupBy], {
    nullable: false
  })
  async groupByDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => GroupByDepartmentArgs) args: GroupByDepartmentArgs): Promise<DepartmentGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }
}
