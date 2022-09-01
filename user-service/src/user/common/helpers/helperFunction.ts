import { HttpException, HttpStatus } from '@nestjs/common';

export const getUserProfileUpdateExpressions = function (updateableValue: any) {
  let UpdateExpressionString = 'set';
  let ExpressionAttributeValuesObj = {};
  for (const prop in updateableValue) {
    const newString = ` ${prop} = :${prop}`;
    UpdateExpressionString === 'set'
      ? (UpdateExpressionString = UpdateExpressionString + newString)
      : (UpdateExpressionString = UpdateExpressionString + ', ' + newString);
    ExpressionAttributeValuesObj[`:${prop}`] = updateableValue[prop];
  }
  return { UpdateExpressionString, ExpressionAttributeValuesObj };
};

export const getUserProfileAddressUpdateExpressions = function (
  updateableValue: any,
  currentAddressData: any,
) {
  let updateableArray = [];

  if (currentAddressData !== undefined && Array.isArray(currentAddressData)) {
    const newArray = currentAddressData.map((value) => {
      if (value?.default) {
        value.default = false;
        return value;
      }
      return value;
    });
    updateableArray = [...newArray, updateableValue];
  } else {
    updateableArray = [updateableValue];
  }

  let UpdateExpressionString = 'set address = :address';
  let ExpressionAttributeValuesObj = {
    ':address': updateableArray,
  };

  return { UpdateExpressionString, ExpressionAttributeValuesObj };
};

export const deleteUserProfileAddressByIdExpressions = function (
  addressId: any,
  currentAddressData: any,
) {
  let updateableArray = [];
  let orderIdExist = false;
  if (currentAddressData !== undefined && Array.isArray(currentAddressData)) {
    const newArray = currentAddressData.filter((value) => {
      if (value.id === addressId) {
        if (value.default) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Default address can not be deleted',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        orderIdExist = !orderIdExist;
      }
      return value.id !== addressId;
    });
    updateableArray = [...newArray];
  }

  if (!orderIdExist) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Order id does not exist',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  let UpdateExpressionString = 'set address = :address';
  let ExpressionAttributeValuesObj = {
    ':address': updateableArray,
  };

  return { UpdateExpressionString, ExpressionAttributeValuesObj };
};

export const updateDefaultUserProfileAddressByIdExpressions = function (
  addressId: any,
  currentAddressData: any,
) {
  const updateableArray = currentAddressData.map((value: any) => {
    if (value.id === addressId) {
      value.default = true;
    } else {
      value.default = false;
    }
    return value;
  });

  let UpdateExpressionString = 'set address = :address';
  let ExpressionAttributeValuesObj = {
    ':address': updateableArray,
  };

  return { UpdateExpressionString, ExpressionAttributeValuesObj };
};
