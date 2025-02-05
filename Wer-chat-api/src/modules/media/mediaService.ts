import { FastifyInstance } from 'fastify';
import { MediaListResponse } from './models/mediaListResponse';
import {
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  HeadObjectCommand,
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from '../../config/setting';
import { filesType } from './types/filesType';
import { mediaListType } from './types/mediaListType';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

const tempEndpoint: string[] =
  config.digitalOcean.spacesObjectStorage.endpoint!.split('tabby-dev.');

const s3Client = new S3Client({
  region: config.digitalOcean.spacesObjectStorage.region!,
  endpoint: tempEndpoint[0] + tempEndpoint[1],
  credentials: {
    accessKeyId: config.digitalOcean.spacesObjectStorage.accessKey!,
    secretAccessKey: config.digitalOcean.spacesObjectStorage.secretKey!,
  },
});

const spaceName = config.digitalOcean.spacesObjectStorage.spaceName;

class MediaService {
  generateFileName(folderName: string = '', fileName: string, fileExtension: string = ''): string {
    const tempFileName = fileName.split('.');
    const tempFileExtension = `.${fileExtension.split('/')[1]}`;

    const timestamp = format(new Date(), 'yyMMddHHmmss');

    const randomString = uuidv4().slice(0, 8);

    const key = `${folderName}/${tempFileName[0]}-${timestamp}${randomString}${tempFileExtension}`;

    return key;
  }

  async generateUploadUrl(
    fastify: FastifyInstance,
    files: filesType[],
    folderName: string
  ): Promise<MediaListResponse> {
    try {
      const urls = await Promise.all(
        files.map(async file => {
          const key: string = this.generateFileName(folderName, file.fileName, file.fileExtension);

          const params: any = {
            Bucket: spaceName,
            Key: key,
            ContentType: file.fileExtension,
          };

          const command = new PutObjectCommand(params);

          return {
            fileName: key.split('/')[1] ?? key,
            fileExtension: file.fileExtension,
            media: await getSignedUrl(s3Client, command, { expiresIn: 300 }),
          } as mediaListType;
        })
      );

      return new MediaListResponse(urls);
    } catch (error) {
      fastify.log.error(`Error generating upload media: ${error}`);
      throw new Error('Having problems in generating uploading media');
    }
  }

  async getMediaList(fastify: FastifyInstance, folderName: string): Promise<MediaListResponse> {
    try {
      const getByFolderParams: ListObjectsV2CommandInput = {
        Bucket: spaceName,
        Prefix: `${folderName}/`,
      };

      const getByFolderCommand = new ListObjectsV2Command(getByFolderParams);
      const getByFolderResponse = await s3Client.send(getByFolderCommand);

      if (!getByFolderResponse.Contents || getByFolderResponse.Contents.length === 0) {
        throw new Error(`No files found with the tenantId ${folderName}.`);
      }

      const mediaList = await Promise.all(
        getByFolderResponse.Contents.map(async file => {
          if (file.Key) {
            const command = new GetObjectCommand({
              Bucket: spaceName,
              Key: file.Key,
            });

            const getExt = file.Key.split('.');
            const tempExt: string =
              (getExt[getExt.length - 1].toString() == 'mp4' ? 'video' : 'image') +
              '/' +
              getExt[getExt.length - 1].toString();

            return {
              fileName: file.Key.split('/')[1] ?? file.Key,
              fileExtension: tempExt,
              media: await getSignedUrl(s3Client, command, {expiresIn: 604800} ),
            } as mediaListType;
          }

          return {
            fileName: '',
            media: '',
            fileExtension: '',
          } as mediaListType;
        })
      );

      return new MediaListResponse(mediaList);
    } catch (error) {
      fastify.log.error(`Error retrieving URLs: ${error}`);
      throw new Error(`Having problems in retrieving URLs.`);
    }
  }

  

  async deleteFile(
    fastify: FastifyInstance,
    fileNames: string[],
    folderName: string
  ): Promise<void> {
    const getByFolderResponse = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: spaceName,
        Prefix: `${folderName}/`,
      })
    );

    if (!getByFolderResponse.Contents || getByFolderResponse.Contents.length === 0) {
      fastify.log.error(`FOLDER NOT FOUND: ${folderName}`);
    }

    await Promise.all(
      fileNames.map(async fileName => {
        try {
          await s3Client.send(
            new HeadObjectCommand({
              Bucket: spaceName,
              Key: `${folderName}/${fileName}`,
            })
          );
        } catch (error) {
          fastify.log.error(`FILE NAME NOT FOUND: ${fileName}`);
        }

        try {
          const params = {
            Bucket: spaceName,
            Key: `${folderName}/${fileName}`,
          };

          const command = new DeleteObjectCommand(params);

          await s3Client.send(command);
        } catch (error) {
          fastify.log.error('Error deleting file: ', error);
        }
      })
    );
  }

  async getMedia(fastify: FastifyInstance,folderName: string, fileName: string): Promise<any> {
    try {
      // Parameters for listing objects in the specified folder
      const getByFolderParams: ListObjectsV2CommandInput = {
        Bucket: spaceName,
        Prefix: `${folderName}/${fileName}`,
      };
  
      // Command to list objects in the folder
      const getByFolderCommand = new ListObjectsV2Command(getByFolderParams);
      const getByFolderResponse = await s3Client.send(getByFolderCommand);
  
      // Ensure the file exists
      if (!getByFolderResponse.Contents || getByFolderResponse.Contents.length === 0) {
        fastify.log.error(`No file found with the name ${fileName} in folder ${folderName}.`);
        return {
          fileName: '',
          media: '',
          fileExtension: ''
        } as mediaListType;
      }
  
      const files = getByFolderResponse.Contents?.filter(file => file.Key?.endsWith(`${fileName}`)); // Assuming only one file is found

      if (!files || files.length === 0) {
        fastify.log.error(`No file found with the name ${fileName} in folder ${folderName}.`);
        return {
          fileName: '',
          media: '',
          fileExtension: ''
        } as mediaListType;

      } else if (files.length > 1) {
        fastify.log.error(`Multiple files found with the name ${fileName} in folder ${folderName}.`);
        return {
          fileName: '',
          media: '',
          fileExtension: ''
        } as mediaListType;
      }
      const file = files[0];
      console.log('file',file)
      if(file.Key){
        const command = new GetObjectCommand({
          Bucket: spaceName,
          Key: file.Key,
        });
  
        const getExt = file.Key.split('.');
        const tempExt: string =
          (getExt[getExt.length - 1].toString() === 'mp4' ? 'video' : 'image') +
          '/' +
          getExt[getExt.length - 1].toString();
  
        return {
          fileName: file.Key.split('/')[1] ?? file.Key,
          fileExtension: tempExt,
          media: await getSignedUrl(s3Client, command, {expiresIn: 604800}), // Presigned URL for accessing the file with 1-week expiration
        } as mediaListType;
      
      }
  
      return {
        fileName: '',
        media: '',
        fileExtension: '',
      } as mediaListType;
    } catch (error) {
      fastify.log.error(`Error retrieving the file: ${error}`);
      return {
        fileName: '',
        media: '',
        fileExtension: ''
      } as mediaListType;
    }
  }

}

export default new MediaService();
