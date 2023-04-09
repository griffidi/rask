import * as TypeGraphQL from "type-graphql";

export enum CustomerScalarFieldEnum {
  id = "id",
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  streetAddress = "streetAddress",
  city = "city",
  state = "state",
  zipCode = "zipCode",
  dateCreated = "dateCreated"
}
TypeGraphQL.registerEnumType(CustomerScalarFieldEnum, {
  name: "CustomerScalarFieldEnum",
  description: undefined,
});
