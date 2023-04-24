import type { User } from ':/types/graphql.js';

export type UserEditCancelEventDetail = {};

export const cancelEvent = new CustomEvent<UserEditCancelEventDetail>('cancel', {
  detail: {},
  bubbles: true,
  composed: true,
});

export interface UserEditSaveEventDetail {
  user: User;
}

export const createUserEditSaveEvent = (user: User) => {
  return new CustomEvent<UserEditSaveEventDetail>('save', {
    detail: { user },
    bubbles: true,
    composed: true,
  });
};
