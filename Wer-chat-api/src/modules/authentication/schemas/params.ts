export const loginBodySchema = {
  type: 'object',
  description: 'Firebase login schema',
  properties: {
    idToken: {
      type: 'string',
      description: 'Firebase ID token',
    },
  },
  required: ['idToken'],
};

export const refreshTokenBodySchema = {
  type: 'object',
  description: 'Refresh token schema',
  properties: {
    refreshToken: {
      type: 'string',
      description: 'JWT refresh token',
    },
  },
  required: ['refreshToken'],
};
