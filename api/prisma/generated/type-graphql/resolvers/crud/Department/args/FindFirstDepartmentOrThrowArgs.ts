import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DepartmentOrderByWithRelationInput } from "../../../inputs/DepartmentOrderByWithRelationInput";
import { DepartmentWhereInput } from "../../../inputs/DepartmentWhereInput";
import { DepartmentWhereUniqueInput } from "../../../inputs/DepartmentWhereUniqueInput";
import { DepartmentScalarFieldEnum } from "../../../../enums/DepartmentScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstDepartmentOrThrowArgs {
  @TypeGraphQL.Field(_type => DepartmentWhereInput, {
    nullable: true
  })
  where?: DepartmentWhereInput | undefined;

  @TypeGraphQL.Field(_type => [DepartmentOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: DepartmentOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => DepartmentWhereUniqueInput, {
    nullable: true
  })
  cursor?: DepartmentWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [DepartmentScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "name"> | undefined;
}
