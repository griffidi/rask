import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateEmployeeArgs } from "./args/AggregateEmployeeArgs";
import { CreateOneEmployeeArgs } from "./args/CreateOneEmployeeArgs";
import { DeleteManyEmployeeArgs } from "./args/DeleteManyEmployeeArgs";
import { DeleteOneEmployeeArgs } from "./args/DeleteOneEmployeeArgs";
import { FindFirstEmployeeArgs } from "./args/FindFirstEmployeeArgs";
import { FindFirstEmployeeOrThrowArgs } from "./args/FindFirstEmployeeOrThrowArgs";
import { FindManyEmployeeArgs } from "./args/FindManyEmployeeArgs";
import { FindUniqueEmployeeArgs } from "./args/FindUniqueEmployeeArgs";
import { FindUniqueEmployeeOrThrowArgs } from "./args/FindUniqueEmployeeOrThrowArgs";
import { GroupByEmployeeArgs } from "./args/GroupByEmployeeArgs";
import { UpdateManyEmployeeArgs } from "./args/UpdateManyEmployeeArgs";
import { UpdateOneEmployeeArgs } from "./args/UpdateOneEmployeeArgs";
import { UpsertOneEmployeeArgs } from "./args/UpsertOneEmployeeArgs";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";
import { Employee } from "../../../models/Employee";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateEmployee } from "../../outputs/AggregateEmployee";
import { EmployeeGroupBy } from "../../outputs/EmployeeGroupBy";

@TypeGraphQL.Resolver(_of => Employee)
export class EmployeeCrudResolver {
  @TypeGraphQL.Query(_returns => AggregateEmployee, {
    nullable: false
  })
  async aggregateEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => AggregateEmployeeArgs) args: AggregateEmployeeArgs): Promise<AggregateEmployee> {
    return getPrismaFromContext(ctx).employee.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }

  @TypeGraphQL.Mutation(_returns => Employee, {
    nullable: false
  })
  async createOneEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => CreateOneEmployeeArgs) args: CreateOneEmployeeArgs): Promise<Employee> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => DeleteManyEmployeeArgs) args: DeleteManyEmployeeArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query(_returns => Employee, {
    nullable: true
  })
  async findFirstEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindFirstEmployeeArgs) args: FindFirstEmployeeArgs): Promise<Employee | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query(_returns => [Employee], {
    nullable: false
  })
  async employees(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindManyEmployeeArgs) args: FindManyEmployeeArgs): Promise<Employee[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query(_returns => Employee, {
    nullable: true
  })
  async employee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => FindUniqueEmployeeArgs) args: FindUniqueEmployeeArgs): Promise<Employee | null> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query(_returns => [EmployeeGroupBy], {
    nullable: false
  })
  async groupByEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => GroupByEmployeeArgs) args: GroupByEmployeeArgs): Promise<EmployeeGroupBy[]> {
    const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.groupBy({
      ...args,
      ...Object.fromEntries(
        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
      ),
    });
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => UpdateManyEmployeeArgs) args: UpdateManyEmployeeArgs): Promise<AffectedRowsOutput> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Mutation(_returns => Employee, {
    nullable: false
  })
  async upsertOneEmployee(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args(_type => UpsertOneEmployeeArgs) args: UpsertOneEmployeeArgs): Promise<Employee> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).employee.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
