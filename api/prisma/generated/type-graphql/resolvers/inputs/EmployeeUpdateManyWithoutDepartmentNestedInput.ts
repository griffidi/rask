import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EmployeeCreateOrConnectWithoutDepartmentInput } from "../inputs/EmployeeCreateOrConnectWithoutDepartmentInput";
import { EmployeeCreateWithoutDepartmentInput } from "../inputs/EmployeeCreateWithoutDepartmentInput";
import { EmployeeScalarWhereInput } from "../inputs/EmployeeScalarWhereInput";
import { EmployeeUpdateManyWithWhereWithoutDepartmentInput } from "../inputs/EmployeeUpdateManyWithWhereWithoutDepartmentInput";
import { EmployeeUpdateWithWhereUniqueWithoutDepartmentInput } from "../inputs/EmployeeUpdateWithWhereUniqueWithoutDepartmentInput";
import { EmployeeUpsertWithWhereUniqueWithoutDepartmentInput } from "../inputs/EmployeeUpsertWithWhereUniqueWithoutDepartmentInput";
import { EmployeeWhereUniqueInput } from "../inputs/EmployeeWhereUniqueInput";

@TypeGraphQL.InputType("EmployeeUpdateManyWithoutDepartmentNestedInput", {
  isAbstract: true
})
export class EmployeeUpdateManyWithoutDepartmentNestedInput {
  @TypeGraphQL.Field(_type => [EmployeeCreateWithoutDepartmentInput], {
    nullable: true
  })
  create?: EmployeeCreateWithoutDepartmentInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeCreateOrConnectWithoutDepartmentInput], {
    nullable: true
  })
  connectOrCreate?: EmployeeCreateOrConnectWithoutDepartmentInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeUpsertWithWhereUniqueWithoutDepartmentInput], {
    nullable: true
  })
  upsert?: EmployeeUpsertWithWhereUniqueWithoutDepartmentInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeWhereUniqueInput], {
    nullable: true
  })
  set?: EmployeeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeWhereUniqueInput], {
    nullable: true
  })
  disconnect?: EmployeeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeWhereUniqueInput], {
    nullable: true
  })
  delete?: EmployeeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeWhereUniqueInput], {
    nullable: true
  })
  connect?: EmployeeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeUpdateWithWhereUniqueWithoutDepartmentInput], {
    nullable: true
  })
  update?: EmployeeUpdateWithWhereUniqueWithoutDepartmentInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeUpdateManyWithWhereWithoutDepartmentInput], {
    nullable: true
  })
  updateMany?: EmployeeUpdateManyWithWhereWithoutDepartmentInput[] | undefined;

  @TypeGraphQL.Field(_type => [EmployeeScalarWhereInput], {
    nullable: true
  })
  deleteMany?: EmployeeScalarWhereInput[] | undefined;
}
