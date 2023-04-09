import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueRoleOrThrowArgs } from "./args/FindUniqueRoleOrThrowArgs";
import { Role } from "../../../models/Role";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Role)
export class FindUniqueRoleOrThrowResolver {
  @TypeGraphQL.Query(_returns => Role, {
    nullable: true
  })
  async getRole(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindUniqueRoleOrThrowArgs) args: FindUniqueRoleOrThrowArgs): Promise<Role | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).role.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
