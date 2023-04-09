import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Department } from "../../../models/Department";
import { Employee } from "../../../models/Employee";
import { DepartmentEmployeesArgs } from "./args/DepartmentEmployeesArgs";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Department)
export class DepartmentRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Employee], {
    nullable: false
  })
  async employees(@TypeGraphQL.Root() department: Department, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => DepartmentEmployeesArgs) args: DepartmentEmployeesArgs): Promise<Employee[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.findUniqueOrThrow({
      where: {
        id: department.id,
      },
    }).employees({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
