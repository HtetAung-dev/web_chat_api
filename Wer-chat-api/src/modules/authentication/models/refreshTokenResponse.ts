export class RefreshTokenResponse {
  public accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
