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
  'landmark',
  'city',
  'state',
  'country',
  'pin',
  'phoneNumber',
  'default',
];

export const DYNAMO_CONDITIONAL_ERROR = 'ConditionalCheckFailedException';
