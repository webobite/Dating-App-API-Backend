import { MyUser } from "../entity/MyUser";
import { getConnection } from "typeorm";

/**
 * Block user with email id of that specific user
 */
export class BlockUserService {
  public static async blockUser(email: string, blockedUserEmail: string) {
    try {
// Find the block user 
      const user = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(MyUser, "user")
        .where({
          email: email,
        })
        .getOne();

        console.log("user --> " + user);
        
        

      
      const afterBlocking = await getConnection()
        .createQueryBuilder()
        .update(MyUser)
        .set({
          blockedByUserId: [user.id],
        })
        .where({
          email: email,
        })
        .execute();

      console.log("After blocking User " + afterBlocking);

      return {
        email,
        blockedUserEmail,
        afterBlocking,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
