import { FastifyInstance } from 'fastify';
import MediaController from './mediaController';
import {
  mediaListSuccessResponseSchema,
  deleteFileResponseSchema,
  errorResponseSchema,
  mediaSuccessResponseSchema,
} from './schemas/responses';
import {
  generateUploadUrlSchema,
  getMediaListSchema,
  deleteFileSchema,
  headerSchema,
  getMediaSchema,
} from './schemas/params';

const TAGS = ['media'];

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    '/generateUploadUrl',
    {
      schema: {
        tags: TAGS,
        // headers: headerSchema,
        body: generateUploadUrlSchema,
        response: {
          200: mediaListSuccessResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    MediaController.generateUploadUrl
  );

  fastify.post(
    '/getMediaList',
    {
      schema: {
        tags: TAGS,
        // headers: headerSchema,
        body: getMediaListSchema,
        response: {
          200: mediaListSuccessResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    MediaController.getMediaList
  );

  fastify.post(
    '/getMedia',
    {
      schema: {
        tags: TAGS,
        // headers: headerSchema,
        body: getMediaSchema,
        response: {
          200: mediaSuccessResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    MediaController.getMedia
  );

  fastify.post(
    '/delete',
    {
      schema: {
        tags: TAGS,
        headers: headerSchema,
        body: deleteFileSchema,
        response: {
          200: deleteFileResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    MediaController.deleteFile
  );
}

export default routes;
