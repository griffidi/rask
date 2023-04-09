import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpdateOneEmployeeArgs } from "./args/UpdateOneEmployeeArgs";
import { Employee } from "../../../models/Employee";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Employee)
export class UpdateOneEmployeeResolver {
  @TypeGraphQL.Mutation(_returns => Employee, {
    nullable: true
  })
  async updateOneEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => UpdateOneEmployeeArgs) args: UpdateOneEmployeeArgs): Promise<Employee | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
