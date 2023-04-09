import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeCountAggregate } from "../outputs/EmployeeCountAggregate";
import { EmployeeMaxAggregate } from "../outputs/EmployeeMaxAggregate";
import { EmployeeMinAggregate } from "../outputs/EmployeeMinAggregate";

@TypeGraphQL.ObjectType("AggregateEmployee", {
  isAbstract: true
})
export class AggregateEmployee {
  @TypeGraphQL.Field(_type => EmployeeCountAggregate, {
    nullable: true
  })
  _count!: EmployeeCountAggregate | null;

  @TypeGraphQL.Field(_type => EmployeeMinAggregate, {
    nullable: true
  })
  _min!: EmployeeMinAggregate | null;

  @TypeGraphQL.Field(_type => EmployeeMaxAggregate, {
    nullable: true
  })
  _max!: EmployeeMaxAggregate | null;
}
