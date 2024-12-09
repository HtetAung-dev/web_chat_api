import { UserType } from "../user/types/userType";
import { postgresDb } from "../../db/drizzle";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";

class AuthenticationRepository {
  async createUser(user: UserType): Promise<UserType> {
    const result: UserType[] = await postgresDb
      .insert(usersTable)
      .values({
        name: user.name,
        email: user.email,
        profile_picture_url: user.profile_picture_url,
        google_id: user.google_id,
        createdAt: user.createdAt as Date,
        updatedAt: user.updatedAt as Date,
      })
      .returning();

    return result[0];
  }
  async getUserByEmail(email: string): Promise<UserType | null> {
    const result: UserType[] = await postgresDb
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return result[0] ?? null;
  }
}

export default new AuthenticationRepository();
