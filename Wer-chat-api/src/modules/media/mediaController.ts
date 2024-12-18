import { FastifyReply, FastifyRequest } from 'fastify';
import { MediaListResponse } from './models/mediaListResponse';
import { DeleteFileResponse } from './models/deleteFileResponse';
import MediaService from './mediaService';
import { uploadFileType } from './types/uploadFileType';
import { getFileType } from './types/getFileType';
import { deleteFileType } from './types/deleteFileType';

class MediaController {
  async generateUploadUrl(
    request: FastifyRequest<{ Body: uploadFileType }>,
    reply: FastifyReply
  ): Promise<void> {
    const { files, id } = request.body;
    const uploadedMediaList: MediaListResponse = await MediaService.generateUploadUrl(
      request.server,
      files,
      id
    );
    console.log(uploadedMediaList)
    reply.status(200).send(uploadedMediaList);
  }

  async getMediaList(
    request: FastifyRequest<{ Body: getFileType }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id } = request.body;
    const getMediaList: MediaListResponse = await MediaService.getMediaList(
      request.server,
      id
    );
    reply.status(200).send(getMediaList);
  }

  async getMedia(
    request: FastifyRequest<{ Body: getFileType }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id, fileName } = request.body;
    const getMediaList: any = await MediaService.getMedia(
      request.server,
      id,
      fileName!
    );
    reply.status(200).send({media: getMediaList});
  }

  async deleteFile(
    request: FastifyRequest<{ Body: deleteFileType }>,
    reply: FastifyReply
  ): Promise<void> {
    const { fileNames, id } = request.body;
    await MediaService.deleteFile(request.server, fileNames, id);
    reply.status(200).send(new DeleteFileResponse('Success deleting file'));
  }
}

export default new MediaController();
