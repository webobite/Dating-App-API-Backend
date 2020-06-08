import { MyUser } from "../entity/MyUser";
import { getConnection } from "typeorm";


/**
 * Return all the profile other than the blocked one and calling user profile
 */
 export class ScrollingService {
   /**
    * @param email
    */
   public async scrollFeed(email: any) {
     
     try {
       const user = await getConnection()
       .createQueryBuilder()
       .select("user")
       .from(MyUser, "user")
       .getMany();

       console.log("ALl User : : : ", user);

       if(user.length > 0) {
           return {
               user
           }
       } else {
           return {
               message : "No user present"
           }
       }
       
     } catch (err) {
       throw new Error(err);
     }
   }
   constructor() {}

  
 }

 