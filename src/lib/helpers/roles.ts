import { Role } from '../../types';

export const roleLevels = (role: Role): Role[] => {
  switch (role) {
    case Role.USER: {
      return [Role.USER];
    }
    case Role.ACCOUNT_ADMIN: {
      return [Role.ACCOUNT_ADMIN, Role.USER];
    }
    case Role.ADMIN: {
      return [Role.ADMIN, Role.ACCOUNT_ADMIN, Role.USER];
    }
    case Role.SUPERADMIN: {
      return [Role.SUPERADMIN, Role.ADMIN, Role.ACCOUNT_ADMIN, Role.USER];
    }

    default: {
      return [];
    }
  }
};
