import * as TypeGraphQL from "type-graphql";

export enum UserScalarFieldEnum {
  id = "id",
  userName = "userName",
  password = "password",
  email = "email",
  firstName = "firstName",
  lastName = "lastName",
  roleId = "roleId",
  dateCreated = "dateCreated"
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: "UserScalarFieldEnum",
  description: undefined,
});
