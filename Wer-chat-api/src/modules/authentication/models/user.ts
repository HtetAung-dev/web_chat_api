import { UserType } from "../types/userType";

export class User implements UserType {
  public id?: number; // Make id optional
  public name: string;
  public email: string;
  public profile_picture_url: string;
  public google_id: string;
  public createdAt: string | Date;
  public updatedAt: string | Date;

  constructor(
    name: string,
    email: string,
    profile_picture_url: string,
    google_id: string,
    createdAt: string | Date,
    updatedAt: string | Date,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.profile_picture_url = profile_picture_url;
    this.google_id = google_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromUserType(user: UserType): User {
    return new User(
      user.name,
      user.email,
      user.profile_picture_url ?? "",
      user.google_id,
      user.createdAt instanceof Date
        ? user.createdAt.toISOString()
        : user.createdAt,
      user.updatedAt instanceof Date
        ? user.updatedAt.toISOString()
        : user.updatedAt,
      user.id // Pass id if it exists
    );
  }
}
