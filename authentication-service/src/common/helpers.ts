import { ROLES } from './user.types';

export const isValidRole = (role: string) => {
  const roleObjArray = Object.values(ROLES);
  const availableRoles = roleObjArray.map((role) => role.TYPE);

  return availableRoles.includes(role);
};

export const internalErrMsg = (msg?: string) => ({
  errMsg: msg || 'Internal Server Error',
});
