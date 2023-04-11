import { type GraphQLError } from 'graphql';

export default function errorHandler(errors: readonly GraphQLError[]): void {
  console.group('GraphQl execution error');

  for (const err of errors ?? []) {
    console.error('GraphQL Error', err);
  }

  console.groupCollapsed();

  // return {
  //   code: 0 /*ResponseCode.Failure*/,
  //   success: false,
  //   message: error.message,
  // } as T;
}
