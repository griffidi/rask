import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Employee } from "../models/Employee";
import { DepartmentCount } from "../resolvers/outputs/DepartmentCount";

@TypeGraphQL.ObjectType("Department", {
  isAbstract: true
})
export class Department {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  employees?: Employee[];

  @TypeGraphQL.Field(_type => DepartmentCount, {
    nullable: true
  })
  _count?: DepartmentCount | null;
}
