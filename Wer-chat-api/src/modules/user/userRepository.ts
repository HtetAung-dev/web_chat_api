// import { and, eq, or } from 'drizzle-orm';
import { UserType } from "./types/userType";
import { postgresDb } from "../../db/drizzle";
import { usersTable } from "../../db/schema";

class UserRepository {
  async getUsers(): Promise<UserType[]> {
    return postgresDb.select().from(usersTable);
  }

  async createUser(user: UserType): Promise<UserType> {
    const result: UserType[] = await postgresDb
      .insert(usersTable)
      .values({
        name: user.name,
        email: user.email,
        profile_picture_url: user.profile_picture_url,
        google_id: user.google_id,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      })
      .returning();
    return result[0];
  }
}

export default new UserRepository();
