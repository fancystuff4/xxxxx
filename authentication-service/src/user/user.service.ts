import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { internalErrMsg, isValidRole } from 'src/common/helpers';
import { ROLES } from 'src/common/user.types';
import { UserRepository } from './user.repository';
import { GSI_ATTRS } from './common';

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
        userEntity.roleGSISK = `tenantId-${userEntity.tenantId}-username-${username}`;
        break;
      case ROLES.USER.TYPE:
        if (!tenantId) return internalErrMsg('User should have a tenantId');

        const getTenantResult = await this.findOneInGSI(
          ROLES.TENANT.TYPE,
          `tenantId-${tenantId}`,
          GSI_ATTRS.ROLE_GSI.INDEX_NAME,
        );

        if (getTenantResult.errMsg) return getTenantResult;

        if (
          !getTenantResult.Items?.length ||
          getTenantResult.Items[0].tenantId !== tenantId
        )
          return internalErrMsg('Invalid tenantId');

        userEntity.SK = tenantId;
        userEntity.roleGSIPK = ROLES.USER.TYPE;
        userEntity.roleGSISK = `tenantId-${tenantId}-username-${username}`;
        break;
      default:
        break;
    }

    const otherOptions = {
      ConditionExpression: '#username <> :username and #SK <> :SK',
      ExpressionAttributeValues: {
        ':username': userEntity.username,
        ':SK': userEntity.SK,
      },
      ExpressionAttributeNames: {
        '#username': 'username',
        '#SK': 'SK',
      },
    };

    const result = await this.dbRepository.create(userEntity, otherOptions);

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
        return internalErrMsg('Invalid role is provided');
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

  async findOneInGSI(gsiPK: string, gsiSK: string, gsiIndex: 'roleGSI') {
    let gsiPKName: string;
    let gsiSKName: string;

    switch (gsiIndex) {
      case GSI_ATTRS.ROLE_GSI.INDEX_NAME:
        gsiPKName = GSI_ATTRS.ROLE_GSI.PK_NAME;
        gsiSKName = GSI_ATTRS.ROLE_GSI.SK_NAME;
        break;
      default:
        return internalErrMsg('Invalid GSI index');
    }

    const KeyConditionExpression = `#gsiPK=:gsiPK and begins_with(#gsiSK, :gsiSK)`;

    const ExpressionAttributeNames = {
      '#gsiPK': gsiPKName,
      '#gsiSK': gsiSKName,
    };

    const ExpressionAttributeValues = {
      ':gsiPK': gsiPK,
      ':gsiSK': gsiSK,
    };

    const result = await this.dbRepository.find({
      IndexName: GSI_ATTRS.ROLE_GSI.INDEX_NAME,
      ScanIndexForward: true,
      KeyConditionExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    });

    return result;
  }
}
