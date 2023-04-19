import { createContext } from '@lit-labs/context';

export const isAuthenticatedContext = createContext<boolean>(Symbol.for('is-authenticated-context'));
