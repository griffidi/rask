import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeListRelationFilter } from "../inputs/EmployeeListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("DepartmentWhereInput", {
  isAbstract: true
})
export class DepartmentWhereInput {
  @TypeGraphQL.Field(_type => [DepartmentWhereInput], {
    nullable: true
  })
  AND?: DepartmentWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [DepartmentWhereInput], {
    nullable: true
  })
  OR?: DepartmentWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [DepartmentWhereInput], {
    nullable: true
  })
  NOT?: DepartmentWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => EmployeeListRelationFilter, {
    nullable: true
  })
  employees?: EmployeeListRelationFilter | undefined;
}
