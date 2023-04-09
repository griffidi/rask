import * as TypeGraphQL from "type-graphql";

export enum EmployeeScalarFieldEnum {
  id = "id",
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  gender = "gender",
  streetAddress = "streetAddress",
  city = "city",
  state = "state",
  zipCode = "zipCode",
  jobTitle = "jobTitle",
  departmentId = "departmentId",
  dateStarted = "dateStarted"
}
TypeGraphQL.registerEnumType(EmployeeScalarFieldEnum, {
  name: "EmployeeScalarFieldEnum",
  description: undefined,
});
