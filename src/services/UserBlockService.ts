import { MyUser } from "../entity/MyUser";
import { getConnection } from "typeorm";

/**
 * Block user with email id of that specific user
 */
export class BlockUserService {

  constructor(){
  }
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

        const blockId = user.id;
        
      // const afterBlocking = await getConnection()
      //   .createQueryBuilder()
      //   .insert()
      //   .into(MyUser)
      //   .update({
      //     blockedByUserId.push(blockId);
      //   })

      const afterBlocking = await getConnection()
        .createQueryBuilder()

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
