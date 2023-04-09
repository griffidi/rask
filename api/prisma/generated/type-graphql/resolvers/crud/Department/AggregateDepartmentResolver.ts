import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateDepartmentArgs } from "./args/AggregateDepartmentArgs";
import { Department } from "../../../models/Department";
import { AggregateDepartment } from "../../outputs/AggregateDepartment";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Department)
export class AggregateDepartmentResolver {
  @TypeGraphQL.Query(_returns => AggregateDepartment, {
    nullable: false
  })
  async aggregateDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => AggregateDepartmentArgs) args: AggregateDepartmentArgs): Promise<AggregateDepartment> {
    return getPrismaFromContext(ctx).department.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
