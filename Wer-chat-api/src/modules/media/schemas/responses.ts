export const mediaListSuccessResponseSchema = {
    type: 'object',
    description: 'get medias for get or upload response',
    properties: {
      mediaList: {
        type: 'array',
        description: 'medias',
        items: {
          type: 'object',
          properties: {
            media: {
              type: 'string',
              description: 'requested media',
            },
            fileName: {
              type: 'string',
              description: 'requested file name',
            },
            fileExtension: {
              type: 'string',
              description: 'requested file extension',
            },
          },
          required: ['media', 'fileName'],
        },
      },
    },
    required: ['mediaList'],
  };

  export const mediaSuccessResponseSchema = {
    type: 'object',
    description: 'get medias for get or upload response',
    properties: {
      media: {
          type: 'object',
          properties: {
            media: {
              type: 'string',
              description: 'requested media',
            },
            fileName: {
              type: 'string',
              description: 'requested file name',
            },
            fileExtension: {
              type: 'string',
              description: 'requested file extension',
            },
          },
          required: ['media', 'fileName'],
        },
    },
    required: ['media'],
  };
  
  export const deleteFileResponseSchema = {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  };
  
  export const errorResponseSchema = {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  };
  