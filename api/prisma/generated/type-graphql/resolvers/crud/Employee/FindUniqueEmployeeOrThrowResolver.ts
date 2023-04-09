import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindUniqueEmployeeOrThrowArgs } from "./args/FindUniqueEmployeeOrThrowArgs";
import { Employee } from "../../../models/Employee";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Employee)
export class FindUniqueEmployeeOrThrowResolver {
  @TypeGraphQL.Query(_returns => Employee, {
    nullable: true
  })
  async getEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindUniqueEmployeeOrThrowArgs) args: FindUniqueEmployeeOrThrowArgs): Promise<Employee | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
