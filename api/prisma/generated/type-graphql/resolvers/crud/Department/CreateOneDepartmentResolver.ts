import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateOneDepartmentArgs } from "./args/CreateOneDepartmentArgs";
import { Department } from "../../../models/Department";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Department)
export class CreateOneDepartmentResolver {
  @TypeGraphQL.Mutation(_returns => Department, {
    nullable: false
  })
  async createOneDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => CreateOneDepartmentArgs) args: CreateOneDepartmentArgs): Promise<Department> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
