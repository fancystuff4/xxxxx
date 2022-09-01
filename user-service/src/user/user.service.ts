import { Injectable } from '@nestjs/common';
import { UserParamsDto, UserProfileDto } from './common';
import { profileDataArr, profileAddressDataArr } from './common';
import {
  getUserProfileUpdateExpressions,
  getUserProfileAddressUpdateExpressions,
  deleteUserProfileAddressByIdExpressions,
  updateDefaultUserProfileAddressByIdExpressions,
} from './common';
import { UserRepository } from './user.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private dbRepository: UserRepository) {}

  async addProfile(params: UserParamsDto, body: UserProfileDto) {
    const existPrimaryKey = await this.dbRepository.findByPrimaryKey({
      Key: { ...params },
    });
    if (existPrimaryKey.Item) {
      return;
    }

    const profileData = {};
    profileDataArr.map((value: string) => {
      profileData[value] = body[value] ? body[value] : undefined;
    });

    let result = await this.dbRepository.create(params, profileData);

    return result;
  }

  async getProfile(params: any) {
    const { tenantId, userId } = params;
    const KeyConditionExpression = `tenantId=:tenantId and userId=:userId`;
    const ExpressionAttributeValues = {
      ':tenantId': tenantId,
      ':userId': userId,
    };
    const result = await this.dbRepository.find({
      KeyConditionExpression,
      ExpressionAttributeValues,
    });
    return result;
  }

  async updateProfile(params: any, body: UserProfileDto) {
    const updateableValue = {};
    for (const prop in body) {
      if (profileDataArr.includes(prop) && prop !== 'address') {
        updateableValue[prop] = body[prop];
      }
    }

    const { UpdateExpressionString, ExpressionAttributeValuesObj } =
      getUserProfileUpdateExpressions(updateableValue);

    const conditions = {
      Key: {
        ...params,
      },
      UpdateExpression: UpdateExpressionString,
      ExpressionAttributeValues: ExpressionAttributeValuesObj,
    };

    const result = await this.dbRepository.updateOne(conditions);
    return result;
  }

  async updateProfileAddress(params: any, addressBody: any) {
    const updateableAddress = { id: uuidv4(), default: true };
    for (const prop in addressBody) {
      if (profileAddressDataArr.includes(prop)) {
        if (prop === 'default') {
          return;
        }
        updateableAddress[prop] = addressBody[prop];
      }
    }

    const currentUserData = await this.dbRepository.findByPrimaryKey({
      Key: { ...params },
    });
    const currentAddressData = currentUserData.Item?.address;

    const { UpdateExpressionString, ExpressionAttributeValuesObj } =
      getUserProfileAddressUpdateExpressions(
        updateableAddress,
        currentAddressData,
      );

    const conditions = {
      Key: {
        ...params,
      },
      UpdateExpression: UpdateExpressionString,
      ExpressionAttributeValues: ExpressionAttributeValuesObj,
    };

    const result = await this.dbRepository.updateOne(conditions);
    return result;
  }

  async deleteProfileAddressById(params: any) {
    const { addressId, ...keyParams } = params;

    const currentUserData = await this.dbRepository.findByPrimaryKey({
      Key: { ...keyParams },
    });
    const currentAddressData = currentUserData.Item?.address;

    const { UpdateExpressionString, ExpressionAttributeValuesObj } =
      deleteUserProfileAddressByIdExpressions(addressId, currentAddressData);

    const conditions = {
      Key: {
        ...keyParams,
      },
      UpdateExpression: UpdateExpressionString,
      ExpressionAttributeValues: ExpressionAttributeValuesObj,
    };

    const result = await this.dbRepository.updateOne(conditions);
    return result;
  }

  async updateDefaultProfileAddressById(params: any) {
    const { addressId, ...keyParams } = params;

    const currentUserData = await this.dbRepository.findByPrimaryKey({
      Key: { ...keyParams },
    });

    const currentAddressData = currentUserData.Item?.address;

    const { UpdateExpressionString, ExpressionAttributeValuesObj } =
      updateDefaultUserProfileAddressByIdExpressions(
        addressId,
        currentAddressData,
      );

    const conditions = {
      Key: {
        ...keyParams,
      },
      UpdateExpression: UpdateExpressionString,
      ExpressionAttributeValues: ExpressionAttributeValuesObj,
    };

    const result = await this.dbRepository.updateOne(conditions);
    return result;
  }
}
