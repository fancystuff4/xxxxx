export enum TOKENS {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export const JWT_COOKIE_CONFIG = {
  [TOKENS.ACCESS_TOKEN]: {
    maxAge: 6000000, // in ms
  },

  [TOKENS.REFRESH_TOKEN]: {
    maxAge: 6000000, // in ms
  },
};
