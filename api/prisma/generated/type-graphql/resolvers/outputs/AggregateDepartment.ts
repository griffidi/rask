import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DepartmentCountAggregate } from "../outputs/DepartmentCountAggregate";
import { DepartmentMaxAggregate } from "../outputs/DepartmentMaxAggregate";
import { DepartmentMinAggregate } from "../outputs/DepartmentMinAggregate";

@TypeGraphQL.ObjectType("AggregateDepartment", {
  isAbstract: true,
  simpleResolvers: true
})
export class AggregateDepartment {
  @TypeGraphQL.Field(_type => DepartmentCountAggregate, {
    nullable: true
  })
  _count!: DepartmentCountAggregate | null;

  @TypeGraphQL.Field(_type => DepartmentMinAggregate, {
    nullable: true
  })
  _min!: DepartmentMinAggregate | null;

  @TypeGraphQL.Field(_type => DepartmentMaxAggregate, {
    nullable: true
  })
  _max!: DepartmentMaxAggregate | null;
}
