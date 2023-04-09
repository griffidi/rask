import * as TypeGraphQL from "type-graphql";

export enum RoleScalarFieldEnum {
  id = "id",
  name = "name",
  description = "description",
  dateCreated = "dateCreated"
}
TypeGraphQL.registerEnumType(RoleScalarFieldEnum, {
  name: "RoleScalarFieldEnum",
  description: undefined,
});
