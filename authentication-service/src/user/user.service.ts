import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { internalErrMsg, isValidRole } from 'src/common/helpers';
import { ROLES } from 'src/common/user.types';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private dbRepository: UserRepository) {}

  async create(username: string, role: string, attributes: any): Promise<any> {
    const { tenantId } = attributes;

    const userEntity: any = {
      username,
      role,
      ...attributes,
    };

    if (!isValidRole(role)) return internalErrMsg('Role is not valid');

    switch (role) {
      case ROLES.SUPER_ADMIN.TYPE:
        delete userEntity.tenantId;
        userEntity.SK = ROLES.SUPER_ADMIN.SK;
        userEntity.roleGSIPK = ROLES.SUPER_ADMIN.TYPE;
        userEntity.roleGSISK = username;
        break;

      case ROLES.TENANT.TYPE:
        userEntity.tenantId = uuid().substring(0, 8);
        userEntity.SK = ROLES.TENANT.SK;
        userEntity.roleGSIPK = ROLES.TENANT.TYPE;
        userEntity.roleGSISK = `tenantId-${userEntity.tenantId}-username-username`;
        break;
      case ROLES.USER.TYPE:
        if (!tenantId) return internalErrMsg('User should have a tenantId');
        userEntity.SK = tenantId;
        userEntity.roleGSIPK = ROLES.USER.TYPE;
        userEntity.roleGSISK = `tenantId-${tenantId}-username-${username}`;
        break;
      default:
        break;
    }

    const result = await this.dbRepository.create(userEntity);

    return result;
  }

  async findOne(username: string, role: string, tenantId?: string) {
    const keyValues: {
      username: string;
      SK: string;
    } = { username, SK: '' };

    switch (role) {
      case ROLES.SUPER_ADMIN.TYPE:
        keyValues.SK = ROLES.SUPER_ADMIN.SK;
        break;

      case ROLES.TENANT.TYPE:
        keyValues.SK = ROLES.TENANT.SK;
        break;

      case ROLES.USER.TYPE:
        if (!tenantId)
          return internalErrMsg('TenantId is required for user login');
        keyValues.SK = tenantId;
        break;

      default:
        break;
    }

    const KeyConditionExpression = `username=:username and SK=:SK`;
    const ExpressionAttributeValues = {
      ':username': keyValues.username,
      ':SK': keyValues.SK,
    };

    const result = await this.dbRepository.find({
      KeyConditionExpression,
      ExpressionAttributeValues,
    });

    return result;
  }
}
