import { createContext } from '@lit-labs/context';
import type { User } from '../types/graphql.js';

export const userContext = createContext<User>(Symbol.for('userContext'));
