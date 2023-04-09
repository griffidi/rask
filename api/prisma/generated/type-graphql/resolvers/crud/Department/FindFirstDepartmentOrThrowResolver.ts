import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstDepartmentOrThrowArgs } from "./args/FindFirstDepartmentOrThrowArgs";
import { Department } from "../../../models/Department";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Department)
export class FindFirstDepartmentOrThrowResolver {
  @TypeGraphQL.Query(_returns => Department, {
    nullable: true
  })
  async findFirstDepartmentOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindFirstDepartmentOrThrowArgs) args: FindFirstDepartmentOrThrowArgs): Promise<Department | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
