import { createContext } from '@lit-labs/context';
import type { Router } from '@lit-labs/router';

export const routerContext = createContext<Router>(Symbol.for('employees-router'));
