import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeCountAggregate } from "../outputs/EmployeeCountAggregate";
import { EmployeeMaxAggregate } from "../outputs/EmployeeMaxAggregate";
import { EmployeeMinAggregate } from "../outputs/EmployeeMinAggregate";

@TypeGraphQL.ObjectType("EmployeeGroupBy", {
  isAbstract: true
})
export class EmployeeGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  firstName!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  lastName!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  gender!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  streetAddress!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  city!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  state!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  zipCode!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  jobTitle!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  departmentId!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  dateStarted!: Date;

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
