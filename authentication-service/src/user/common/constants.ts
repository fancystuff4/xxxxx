interface GSI_ATTRIBUTES {
  INDEX_NAME: 'roleGSI';
  PK_NAME: string;
  SK_NAME: string;
}

export const DYNAMO_CONDITIONAL_ERROR = 'ConditionalCheckFailedException';

export const GSI_ATTRS: {
  ROLE_GSI: GSI_ATTRIBUTES;
} = {
  ROLE_GSI: {
    INDEX_NAME: 'roleGSI',
    PK_NAME: 'roleGSIPK',
    SK_NAME: 'roleGSISK',
  },
};
