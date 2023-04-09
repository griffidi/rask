import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstDepartmentArgs } from "./args/FindFirstDepartmentArgs";
import { Department } from "../../../models/Department";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Department)
export class FindFirstDepartmentResolver {
  @TypeGraphQL.Query(_returns => Department, {
    nullable: true
  })
  async findFirstDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindFirstDepartmentArgs) args: FindFirstDepartmentArgs): Promise<Department | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
