import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstEmployeeOrThrowArgs } from "./args/FindFirstEmployeeOrThrowArgs";
import { Employee } from "../../../models/Employee";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Employee)
export class FindFirstEmployeeOrThrowResolver {
  @TypeGraphQL.Query(_returns => Employee, {
    nullable: true
  })
  async findFirstEmployeeOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindFirstEmployeeOrThrowArgs) args: FindFirstEmployeeOrThrowArgs): Promise<Employee | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.findFirstOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
