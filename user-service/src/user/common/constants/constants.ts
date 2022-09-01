export enum genderType {
  Male,
  Female,
  Transgender,
}

export const profileDataArr = [
  'fullName',
  'phoneNumber',
  'birthDate',
  'address',
  'gender',
];

export const profileAddressDataArr = [
  'placeName',
  'city',
  'state',
  'country',
  'pin',
  'default',
];

export const DYNAMO_CONDITIONAL_ERROR = 'ConditionalCheckFailedException';
