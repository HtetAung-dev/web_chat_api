export const headerSchema = {
    type: 'object',
    required: ['authorization'],
    properties: {
      Authorization: { type: 'string' },
    },
  };
  
  export const generateUploadUrlSchema = {
    type: 'object',
    description: 'get media for upload',
    properties: {
      files: {
        type: 'array',
        description: 'requested files',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            fileName: {
              type: 'string',
              description: 'requested file name',
              minLength: 1,
            },
            fileExtension: {
              type: 'string',
              description: 'requested file type',
              enum: ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4'],
            },
          },
          required: ['fileName', 'fileExtension'],
        },
      },
      id: {
        type: 'string',
        description: 'requested folder name',
        minLength: 1,
      },
    },
    required: ['files', 'id'],
  };
  
  export const getMediaListSchema = {
    type: 'object',
    description: 'get media',
    properties: {
      id: {
        type: 'string',
        description: 'requested folder name',
        minLength: 1,
      },
    },
    required: ['id'],
  };

  export const getMediaSchema = {
    type: 'object',
    description: 'get media',
    properties: {
      id: {
        type: 'string',
        description: 'requested folder name',
        minLength: 1,
      },
      fileName: {
        type: 'string',
        description: 'requested file name',
        minLength: 1,
      }
    },
    required: ['id'],
  };
  
  export const deleteFileSchema = {
    type: 'object',
    description: 'delete file schema',
    properties: {
      fileNames: {
        type: 'array',
        description: 'requested file names',
        minItems: 1,
        items: {
          type: 'string',
          minLength: 1,
        },
      },
      id: {
        type: 'string',
        description: 'requested folder name',
        minLength: 1,
      },
    },
    required: ['fileNames', 'id'],
  };
  