import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { RoleWhereInput } from "../inputs/RoleWhereInput";

@TypeGraphQL.InputType("RoleRelationFilter", {
  isAbstract: true
})
export class RoleRelationFilter {
  @TypeGraphQL.Field(_type => RoleWhereInput, {
    nullable: true
  })
  is?: RoleWhereInput | undefined;

  @TypeGraphQL.Field(_type => RoleWhereInput, {
    nullable: true
  })
  isNot?: RoleWhereInput | undefined;
}
