import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { DeleteOneEmployeeArgs } from "./args/DeleteOneEmployeeArgs";
import { Employee } from "../../../models/Employee";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Employee)
export class DeleteOneEmployeeResolver {
  @TypeGraphQL.Mutation(_returns => Employee, {
    nullable: true
  })
  async deleteOneEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => DeleteOneEmployeeArgs) args: DeleteOneEmployeeArgs): Promise<Employee | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
