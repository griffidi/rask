import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpsertOneDepartmentArgs } from "./args/UpsertOneDepartmentArgs";
import { Department } from "../../../models/Department";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Department)
export class UpsertOneDepartmentResolver {
  @TypeGraphQL.Mutation(_returns => Department, {
    nullable: false
  })
  async upsertOneDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => UpsertOneDepartmentArgs) args: UpsertOneDepartmentArgs): Promise<Department> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
