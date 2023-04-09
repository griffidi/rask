import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as argsTypes from "./resolvers/crud/args.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";

export type MethodDecoratorOverrideFn = (decorators: MethodDecorator[]) => MethodDecorator[];

const crudResolversMap = {
  Customer: crudResolvers.CustomerCrudResolver,
  Department: crudResolvers.DepartmentCrudResolver,
  Employee: crudResolvers.EmployeeCrudResolver,
  User: crudResolvers.UserCrudResolver,
  Role: crudResolvers.RoleCrudResolver
};
const actionResolversMap = {
  Customer: {
    aggregateCustomer: actionResolvers.AggregateCustomerResolver,
    createOneCustomer: actionResolvers.CreateOneCustomerResolver,
    deleteManyCustomer: actionResolvers.DeleteManyCustomerResolver,
    deleteOneCustomer: actionResolvers.DeleteOneCustomerResolver,
    findFirstCustomer: actionResolvers.FindFirstCustomerResolver,
    findFirstCustomerOrThrow: actionResolvers.FindFirstCustomerOrThrowResolver,
    customers: actionResolvers.FindManyCustomerResolver,
    customer: actionResolvers.FindUniqueCustomerResolver,
    getCustomer: actionResolvers.FindUniqueCustomerOrThrowResolver,
    groupByCustomer: actionResolvers.GroupByCustomerResolver,
    updateManyCustomer: actionResolvers.UpdateManyCustomerResolver,
    updateOneCustomer: actionResolvers.UpdateOneCustomerResolver,
    upsertOneCustomer: actionResolvers.UpsertOneCustomerResolver
  },
  Department: {
    aggregateDepartment: actionResolvers.AggregateDepartmentResolver,
    createOneDepartment: actionResolvers.CreateOneDepartmentResolver,
    deleteManyDepartment: actionResolvers.DeleteManyDepartmentResolver,
    deleteOneDepartment: actionResolvers.DeleteOneDepartmentResolver,
    findFirstDepartment: actionResolvers.FindFirstDepartmentResolver,
    findFirstDepartmentOrThrow: actionResolvers.FindFirstDepartmentOrThrowResolver,
    departments: actionResolvers.FindManyDepartmentResolver,
    department: actionResolvers.FindUniqueDepartmentResolver,
    getDepartment: actionResolvers.FindUniqueDepartmentOrThrowResolver,
    groupByDepartment: actionResolvers.GroupByDepartmentResolver,
    updateManyDepartment: actionResolvers.UpdateManyDepartmentResolver,
    updateOneDepartment: actionResolvers.UpdateOneDepartmentResolver,
    upsertOneDepartment: actionResolvers.UpsertOneDepartmentResolver
  },
  Employee: {
    aggregateEmployee: actionResolvers.AggregateEmployeeResolver,
    createOneEmployee: actionResolvers.CreateOneEmployeeResolver,
    deleteManyEmployee: actionResolvers.DeleteManyEmployeeResolver,
    deleteOneEmployee: actionResolvers.DeleteOneEmployeeResolver,
    findFirstEmployee: actionResolvers.FindFirstEmployeeResolver,
    findFirstEmployeeOrThrow: actionResolvers.FindFirstEmployeeOrThrowResolver,
    employees: actionResolvers.FindManyEmployeeResolver,
    employee: actionResolvers.FindUniqueEmployeeResolver,
    getEmployee: actionResolvers.FindUniqueEmployeeOrThrowResolver,
    groupByEmployee: actionResolvers.GroupByEmployeeResolver,
    updateManyEmployee: actionResolvers.UpdateManyEmployeeResolver,
    updateOneEmployee: actionResolvers.UpdateOneEmployeeResolver,
    upsertOneEmployee: actionResolvers.UpsertOneEmployeeResolver
  },
  User: {
    aggregateUser: actionResolvers.AggregateUserResolver,
    createOneUser: actionResolvers.CreateOneUserResolver,
    deleteManyUser: actionResolvers.DeleteManyUserResolver,
    deleteOneUser: actionResolvers.DeleteOneUserResolver,
    findFirstUser: actionResolvers.FindFirstUserResolver,
    findFirstUserOrThrow: actionResolvers.FindFirstUserOrThrowResolver,
    users: actionResolvers.FindManyUserResolver,
    user: actionResolvers.FindUniqueUserResolver,
    getUser: actionResolvers.FindUniqueUserOrThrowResolver,
    groupByUser: actionResolvers.GroupByUserResolver,
    updateManyUser: actionResolvers.UpdateManyUserResolver,
    updateOneUser: actionResolvers.UpdateOneUserResolver,
    upsertOneUser: actionResolvers.UpsertOneUserResolver
  },
  Role: {
    aggregateRole: actionResolvers.AggregateRoleResolver,
    createOneRole: actionResolvers.CreateOneRoleResolver,
    deleteManyRole: actionResolvers.DeleteManyRoleResolver,
    deleteOneRole: actionResolvers.DeleteOneRoleResolver,
    findFirstRole: actionResolvers.FindFirstRoleResolver,
    findFirstRoleOrThrow: actionResolvers.FindFirstRoleOrThrowResolver,
    roles: actionResolvers.FindManyRoleResolver,
    role: actionResolvers.FindUniqueRoleResolver,
    getRole: actionResolvers.FindUniqueRoleOrThrowResolver,
    groupByRole: actionResolvers.GroupByRoleResolver,
    updateManyRole: actionResolvers.UpdateManyRoleResolver,
    updateOneRole: actionResolvers.UpdateOneRoleResolver,
    upsertOneRole: actionResolvers.UpsertOneRoleResolver
  }
};
const crudResolversInfo = {
  Customer: ["aggregateCustomer", "createOneCustomer", "deleteManyCustomer", "deleteOneCustomer", "findFirstCustomer", "findFirstCustomerOrThrow", "customers", "customer", "getCustomer", "groupByCustomer", "updateManyCustomer", "updateOneCustomer", "upsertOneCustomer"],
  Department: ["aggregateDepartment", "createOneDepartment", "deleteManyDepartment", "deleteOneDepartment", "findFirstDepartment", "findFirstDepartmentOrThrow", "departments", "department", "getDepartment", "groupByDepartment", "updateManyDepartment", "updateOneDepartment", "upsertOneDepartment"],
  Employee: ["aggregateEmployee", "createOneEmployee", "deleteManyEmployee", "deleteOneEmployee", "findFirstEmployee", "findFirstEmployeeOrThrow", "employees", "employee", "getEmployee", "groupByEmployee", "updateManyEmployee", "updateOneEmployee", "upsertOneEmployee"],
  User: ["aggregateUser", "createOneUser", "deleteManyUser", "deleteOneUser", "findFirstUser", "findFirstUserOrThrow", "users", "user", "getUser", "groupByUser", "updateManyUser", "updateOneUser", "upsertOneUser"],
  Role: ["aggregateRole", "createOneRole", "deleteManyRole", "deleteOneRole", "findFirstRole", "findFirstRoleOrThrow", "roles", "role", "getRole", "groupByRole", "updateManyRole", "updateOneRole", "upsertOneRole"]
};
const argsInfo = {
  AggregateCustomerArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateOneCustomerArgs: ["data"],
  DeleteManyCustomerArgs: ["where"],
  DeleteOneCustomerArgs: ["where"],
  FindFirstCustomerArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstCustomerOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyCustomerArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueCustomerArgs: ["where"],
  FindUniqueCustomerOrThrowArgs: ["where"],
  GroupByCustomerArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyCustomerArgs: ["data", "where"],
  UpdateOneCustomerArgs: ["data", "where"],
  UpsertOneCustomerArgs: ["where", "create", "update"],
  AggregateDepartmentArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateOneDepartmentArgs: ["data"],
  DeleteManyDepartmentArgs: ["where"],
  DeleteOneDepartmentArgs: ["where"],
  FindFirstDepartmentArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstDepartmentOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyDepartmentArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueDepartmentArgs: ["where"],
  FindUniqueDepartmentOrThrowArgs: ["where"],
  GroupByDepartmentArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyDepartmentArgs: ["data", "where"],
  UpdateOneDepartmentArgs: ["data", "where"],
  UpsertOneDepartmentArgs: ["where", "create", "update"],
  AggregateEmployeeArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateOneEmployeeArgs: ["data"],
  DeleteManyEmployeeArgs: ["where"],
  DeleteOneEmployeeArgs: ["where"],
  FindFirstEmployeeArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstEmployeeOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyEmployeeArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueEmployeeArgs: ["where"],
  FindUniqueEmployeeOrThrowArgs: ["where"],
  GroupByEmployeeArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyEmployeeArgs: ["data", "where"],
  UpdateOneEmployeeArgs: ["data", "where"],
  UpsertOneEmployeeArgs: ["where", "create", "update"],
  AggregateUserArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateOneUserArgs: ["data"],
  DeleteManyUserArgs: ["where"],
  DeleteOneUserArgs: ["where"],
  FindFirstUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstUserOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueUserArgs: ["where"],
  FindUniqueUserOrThrowArgs: ["where"],
  GroupByUserArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyUserArgs: ["data", "where"],
  UpdateOneUserArgs: ["data", "where"],
  UpsertOneUserArgs: ["where", "create", "update"],
  AggregateRoleArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateOneRoleArgs: ["data"],
  DeleteManyRoleArgs: ["where"],
  DeleteOneRoleArgs: ["where"],
  FindFirstRoleArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstRoleOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyRoleArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueRoleArgs: ["where"],
  FindUniqueRoleOrThrowArgs: ["where"],
  GroupByRoleArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyRoleArgs: ["data", "where"],
  UpdateOneRoleArgs: ["data", "where"],
  UpsertOneRoleArgs: ["where", "create", "update"]
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
> = keyof typeof crudResolversMap[TModel]["prototype"];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
> = Partial<Record<ModelResolverActionNames<TModel>, MethodDecorator[] | MethodDecoratorOverrideFn>>
  & { _all?: MethodDecorator[] };

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    const allActionsDecorators = resolverActionsConfig._all ?? [];
    const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
    for (const resolverActionName of resolverActionNames) {
      const maybeDecoratorsOrFn = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[] | MethodDecoratorOverrideFn | undefined;
      let decorators: MethodDecorator[];
      if (typeof maybeDecoratorsOrFn === "function") {
        decorators = maybeDecoratorsOrFn(allActionsDecorators);
      } else {
        decorators = [...allActionsDecorators, ...maybeDecoratorsOrFn ?? []];
      }
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]["prototype"],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
> = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}

const relationResolversMap = {
  Department: relationResolvers.DepartmentRelationsResolver,
  Employee: relationResolvers.EmployeeRelationsResolver,
  User: relationResolvers.UserRelationsResolver,
  Role: relationResolvers.RoleRelationsResolver
};
const relationResolversInfo = {
  Department: ["employees"],
  Employee: ["department"],
  User: ["role"],
  Role: ["users"]
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
> = keyof typeof relationResolversMap[TModel]["prototype"];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel>, MethodDecorator[] | MethodDecoratorOverrideFn>>
  & { _all?: MethodDecorator[] };

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    const allActionsDecorators = relationResolverActionsConfig._all ?? [];
    const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
    for (const relationResolverActionName of relationResolverActionNames) {
      const maybeDecoratorsOrFn = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[] | MethodDecoratorOverrideFn | undefined;
      let decorators: MethodDecorator[];
      if (typeof maybeDecoratorsOrFn === "function") {
        decorators = maybeDecoratorsOrFn(allActionsDecorators);
      } else {
        decorators = [...allActionsDecorators, ...maybeDecoratorsOrFn ?? []];
      }
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

export type PropertyDecoratorOverrideFn = (decorators: PropertyDecorator[]) => PropertyDecorator[];

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys, PropertyDecorator[] | PropertyDecoratorOverrideFn>
> & { _all?: PropertyDecorator[] };

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    const allFieldsDecorators = enhanceConfig.fields._all ?? [];
    for (const typeFieldName of typeFieldNames) {
      const maybeDecoratorsOrFn = enhanceConfig.fields[
        typeFieldName
      ] as PropertyDecorator[] | PropertyDecoratorOverrideFn | undefined;
      let decorators: PropertyDecorator[];
      if (typeof maybeDecoratorsOrFn === "function") {
        decorators = maybeDecoratorsOrFn(allFieldsDecorators);
      } else {
        decorators = [...allFieldsDecorators, ...maybeDecoratorsOrFn ?? []];
      }
      tslib.__decorate(decorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  Customer: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  Department: ["id", "name"],
  Employee: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted"],
  User: ["id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated"],
  Role: ["id", "name", "description", "dateCreated"]
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

const outputsInfo = {
  AggregateCustomer: ["_count", "_min", "_max"],
  CustomerGroupBy: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated", "_count", "_min", "_max"],
  AggregateDepartment: ["_count", "_min", "_max"],
  DepartmentGroupBy: ["id", "name", "_count", "_min", "_max"],
  AggregateEmployee: ["_count", "_min", "_max"],
  EmployeeGroupBy: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted", "_count", "_min", "_max"],
  AggregateUser: ["_count", "_min", "_max"],
  UserGroupBy: ["id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated", "_count", "_min", "_max"],
  AggregateRole: ["_count", "_min", "_max"],
  RoleGroupBy: ["id", "name", "description", "dateCreated", "_count", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  CustomerCountAggregate: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated", "_all"],
  CustomerMinAggregate: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  CustomerMaxAggregate: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  DepartmentCount: ["employees"],
  DepartmentCountAggregate: ["id", "name", "_all"],
  DepartmentMinAggregate: ["id", "name"],
  DepartmentMaxAggregate: ["id", "name"],
  EmployeeCountAggregate: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted", "_all"],
  EmployeeMinAggregate: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted"],
  EmployeeMaxAggregate: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted"],
  UserCountAggregate: ["id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated", "_all"],
  UserMinAggregate: ["id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated"],
  UserMaxAggregate: ["id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated"],
  RoleCount: ["users"],
  RoleCountAggregate: ["id", "name", "description", "dateCreated", "_all"],
  RoleMinAggregate: ["id", "name", "description", "dateCreated"],
  RoleMaxAggregate: ["id", "name", "description", "dateCreated"]
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]["prototype"],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
> = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

const inputsInfo = {
  CustomerWhereInput: ["AND", "OR", "NOT", "id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  CustomerOrderByWithRelationInput: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  CustomerWhereUniqueInput: ["id", "email"],
  CustomerOrderByWithAggregationInput: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated", "_count", "_max", "_min"],
  CustomerScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  DepartmentWhereInput: ["AND", "OR", "NOT", "id", "name", "employees"],
  DepartmentOrderByWithRelationInput: ["id", "name", "employees"],
  DepartmentWhereUniqueInput: ["id", "name"],
  DepartmentOrderByWithAggregationInput: ["id", "name", "_count", "_max", "_min"],
  DepartmentScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name"],
  EmployeeWhereInput: ["AND", "OR", "NOT", "id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted", "department"],
  EmployeeOrderByWithRelationInput: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted", "department"],
  EmployeeWhereUniqueInput: ["id", "email"],
  EmployeeOrderByWithAggregationInput: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted", "_count", "_max", "_min"],
  EmployeeScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted"],
  UserWhereInput: ["AND", "OR", "NOT", "id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated", "role"],
  UserOrderByWithRelationInput: ["id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated", "role"],
  UserWhereUniqueInput: ["id", "userName", "email"],
  UserOrderByWithAggregationInput: ["id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated", "_count", "_max", "_min"],
  UserScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated"],
  RoleWhereInput: ["AND", "OR", "NOT", "id", "name", "description", "dateCreated", "users"],
  RoleOrderByWithRelationInput: ["id", "name", "description", "dateCreated", "users"],
  RoleWhereUniqueInput: ["id", "name"],
  RoleOrderByWithAggregationInput: ["id", "name", "description", "dateCreated", "_count", "_max", "_min"],
  RoleScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "description", "dateCreated"],
  CustomerCreateInput: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  CustomerUpdateInput: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  CustomerUpdateManyMutationInput: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  DepartmentCreateInput: ["id", "name", "employees"],
  DepartmentUpdateInput: ["id", "name", "employees"],
  DepartmentUpdateManyMutationInput: ["id", "name"],
  EmployeeCreateInput: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "dateStarted", "department"],
  EmployeeUpdateInput: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "dateStarted", "department"],
  EmployeeUpdateManyMutationInput: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "dateStarted"],
  UserCreateInput: ["id", "userName", "password", "email", "firstName", "lastName", "dateCreated", "role"],
  UserUpdateInput: ["id", "userName", "password", "email", "firstName", "lastName", "dateCreated", "role"],
  UserUpdateManyMutationInput: ["id", "userName", "password", "email", "firstName", "lastName", "dateCreated"],
  RoleCreateInput: ["id", "name", "description", "dateCreated", "users"],
  RoleUpdateInput: ["id", "name", "description", "dateCreated", "users"],
  RoleUpdateManyMutationInput: ["id", "name", "description", "dateCreated"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  CustomerCountOrderByAggregateInput: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  CustomerMaxOrderByAggregateInput: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  CustomerMinOrderByAggregateInput: ["id", "firstName", "lastName", "email", "streetAddress", "city", "state", "zipCode", "dateCreated"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  EmployeeListRelationFilter: ["every", "some", "none"],
  EmployeeOrderByRelationAggregateInput: ["_count"],
  DepartmentCountOrderByAggregateInput: ["id", "name"],
  DepartmentMaxOrderByAggregateInput: ["id", "name"],
  DepartmentMinOrderByAggregateInput: ["id", "name"],
  DepartmentRelationFilter: ["is", "isNot"],
  EmployeeCountOrderByAggregateInput: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted"],
  EmployeeMaxOrderByAggregateInput: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted"],
  EmployeeMinOrderByAggregateInput: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted"],
  RoleRelationFilter: ["is", "isNot"],
  UserCountOrderByAggregateInput: ["id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated"],
  UserMaxOrderByAggregateInput: ["id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated"],
  UserMinOrderByAggregateInput: ["id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated"],
  UserListRelationFilter: ["every", "some", "none"],
  UserOrderByRelationAggregateInput: ["_count"],
  RoleCountOrderByAggregateInput: ["id", "name", "description", "dateCreated"],
  RoleMaxOrderByAggregateInput: ["id", "name", "description", "dateCreated"],
  RoleMinOrderByAggregateInput: ["id", "name", "description", "dateCreated"],
  StringFieldUpdateOperationsInput: ["set"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  EmployeeCreateNestedManyWithoutDepartmentInput: ["create", "connectOrCreate", "connect"],
  EmployeeUpdateManyWithoutDepartmentNestedInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  DepartmentCreateNestedOneWithoutEmployeesInput: ["create", "connectOrCreate", "connect"],
  DepartmentUpdateOneRequiredWithoutEmployeesNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  RoleCreateNestedOneWithoutUsersInput: ["create", "connectOrCreate", "connect"],
  RoleUpdateOneRequiredWithoutUsersNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  UserCreateNestedManyWithoutRoleInput: ["create", "connectOrCreate", "connect"],
  UserUpdateManyWithoutRoleNestedInput: ["create", "connectOrCreate", "upsert", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  EmployeeCreateWithoutDepartmentInput: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "dateStarted"],
  EmployeeCreateOrConnectWithoutDepartmentInput: ["where", "create"],
  EmployeeUpsertWithWhereUniqueWithoutDepartmentInput: ["where", "update", "create"],
  EmployeeUpdateWithWhereUniqueWithoutDepartmentInput: ["where", "data"],
  EmployeeUpdateManyWithWhereWithoutDepartmentInput: ["where", "data"],
  EmployeeScalarWhereInput: ["AND", "OR", "NOT", "id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "departmentId", "dateStarted"],
  DepartmentCreateWithoutEmployeesInput: ["id", "name"],
  DepartmentCreateOrConnectWithoutEmployeesInput: ["where", "create"],
  DepartmentUpsertWithoutEmployeesInput: ["update", "create"],
  DepartmentUpdateWithoutEmployeesInput: ["id", "name"],
  RoleCreateWithoutUsersInput: ["id", "name", "description", "dateCreated"],
  RoleCreateOrConnectWithoutUsersInput: ["where", "create"],
  RoleUpsertWithoutUsersInput: ["update", "create"],
  RoleUpdateWithoutUsersInput: ["id", "name", "description", "dateCreated"],
  UserCreateWithoutRoleInput: ["id", "userName", "password", "email", "firstName", "lastName", "dateCreated"],
  UserCreateOrConnectWithoutRoleInput: ["where", "create"],
  UserUpsertWithWhereUniqueWithoutRoleInput: ["where", "update", "create"],
  UserUpdateWithWhereUniqueWithoutRoleInput: ["where", "data"],
  UserUpdateManyWithWhereWithoutRoleInput: ["where", "data"],
  UserScalarWhereInput: ["AND", "OR", "NOT", "id", "userName", "password", "email", "firstName", "lastName", "roleId", "dateCreated"],
  EmployeeUpdateWithoutDepartmentInput: ["id", "firstName", "lastName", "email", "gender", "streetAddress", "city", "state", "zipCode", "jobTitle", "dateStarted"],
  UserUpdateWithoutRoleInput: ["id", "userName", "password", "email", "firstName", "lastName", "dateCreated"]
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]["prototype"],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
> = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

