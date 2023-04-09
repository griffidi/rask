import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EmployeeOrderByWithRelationInput } from "../../../inputs/EmployeeOrderByWithRelationInput";
import { EmployeeWhereInput } from "../../../inputs/EmployeeWhereInput";
import { EmployeeWhereUniqueInput } from "../../../inputs/EmployeeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateEmployeeArgs {
  @TypeGraphQL.Field(_type => EmployeeWhereInput, {
    nullable: true
  })
  where?: EmployeeWhereInput | undefined;

  @TypeGraphQL.Field(_type => [EmployeeOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: EmployeeOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => EmployeeWhereUniqueInput, {
    nullable: true
  })
  cursor?: EmployeeWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
