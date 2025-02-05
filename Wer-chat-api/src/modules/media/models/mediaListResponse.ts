import { mediaListType } from "../types/mediaListType";

export class MediaListResponse {
    public mediaList: mediaListType[];
    constructor(mediaList: mediaListType[]) { this.mediaList = mediaList; }
}