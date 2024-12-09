export class AuthResponse {
  public accessToken: string;
  public refreshToken: string;
  public userId: number;

  constructor(accessToken: string, refreshToken: string, userId: number) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
  }
}
