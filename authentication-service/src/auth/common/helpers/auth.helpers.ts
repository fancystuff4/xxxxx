import { TOKENS } from '..';

export const getTokensConfig = (atsecret: string, rtsecret: string) => ({
  [TOKENS.ACCESS_TOKEN]: {
    expiresIn: 60, // in seconds
    secret: atsecret,
  },

  [TOKENS.REFRESH_TOKEN]: {
    expiresIn: 600, // in seconds
    secret: rtsecret,
  },
});
