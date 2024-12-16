// import { and, eq, or } from 'drizzle-orm';
import { UserType } from "./types/userType";
import { postgresDb } from "../../db/drizzle";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";

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

  async getUserById(userId: number): Promise<UserType | null> {
    const result = await postgresDb.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1); 
    return result.length > 0 ? result[0] : null;
  }

  async updateUser(userId: number, name: string, profile_picture_url: string) : Promise<UserType | null> {
    const result: UserType[] | null = await postgresDb.update(usersTable).set({
      name: name,
      profile_picture_url: profile_picture_url,
      updatedAt: new Date()
    }).where(eq(usersTable.id, Number.parseInt(userId.toString()))).returning();
    return result.length > 0 ? result[0] : null;
  }
  
}

export default new UserRepository();

