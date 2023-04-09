import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateDepartmentArgs } from "./args/AggregateDepartmentArgs";
import { CreateOneDepartmentArgs } from "./args/CreateOneDepartmentArgs";
import { DeleteManyDepartmentArgs } from "./args/DeleteManyDepartmentArgs";
import { DeleteOneDepartmentArgs } from "./args/DeleteOneDepartmentArgs";
import { FindFirstDepartmentArgs } from "./args/FindFirstDepartmentArgs";
import { FindFirstDepartmentOrThrowArgs } from "./args/FindFirstDepartmentOrThrowArgs";
import { FindManyDepartmentArgs } from "./args/FindManyDepartmentArgs";
import { FindUniqueDepartmentArgs } from "./args/FindUniqueDepartmentArgs";
import { FindUniqueDepartmentOrThrowArgs } from "./args/FindUniqueDepartmentOrThrowArgs";
import { GroupByDepartmentArgs } from "./args/GroupByDepartmentArgs";
import { UpdateManyDepartmentArgs } from "./args/UpdateManyDepartmentArgs";
import { UpdateOneDepartmentArgs } from "./args/UpdateOneDepartmentArgs";
import { UpsertOneDepartmentArgs } from "./args/UpsertOneDepartmentArgs";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";
import { Department } from "../../../models/Department";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateDepartment } from "../../outputs/AggregateDepartment";
import { DepartmentGroupBy } from "../../outputs/DepartmentGroupBy";

@TypeGraphQL.Resolver(_of => Department)
export class DepartmentCrudResolver {
  @TypeGraphQL.Query(_returns => AggregateDepartment, {
    nullable: false
  })
  async aggregateDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => AggregateDepartmentArgs) args: AggregateDepartmentArgs): Promise<AggregateDepartment> {
    return getPrismaFromContext(ctx).department.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }

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

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => DeleteManyDepartmentArgs) args: DeleteManyDepartmentArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => Department, {
    nullable: true
  })
  async deleteOneDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => DeleteOneDepartmentArgs) args: DeleteOneDepartmentArgs): Promise<Department | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query(_returns => [Department], {
    nullable: false
  })
  async departments(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindManyDepartmentArgs) args: FindManyDepartmentArgs): Promise<Department[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => Department, {
    nullable: true
  })
  async department(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindUniqueDepartmentArgs) args: FindUniqueDepartmentArgs): Promise<Department | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => Department, {
    nullable: true
  })
  async getDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindUniqueDepartmentOrThrowArgs) args: FindUniqueDepartmentOrThrowArgs): Promise<Department | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.findUniqueOrThrow({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => [DepartmentGroupBy], {
    nullable: false
  })
  async groupByDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => GroupByDepartmentArgs) args: GroupByDepartmentArgs): Promise<DepartmentGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => UpdateManyDepartmentArgs) args: UpdateManyDepartmentArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => Department, {
    nullable: true
  })
  async updateOneDepartment(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => UpdateOneDepartmentArgs) args: UpdateOneDepartmentArgs): Promise<Department | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).department.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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
