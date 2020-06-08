import { MyUser } from "../entity/MyUser";
import { getConnection } from "typeorm";

export class ImageService {
  public static async updateImage(email: string, imageUrl: string) {
    try {
      const updateImageResult = await getConnection()
        .createQueryBuilder()
        .update(MyUser)
        .set({
          imagePath: imageUrl,
        })
        .where({ email: email })
        .execute();

      console.log("Updated Image Result : : : ", updateImageResult);
    } catch (err) {
        console.log(
            
        );
        
      throw new Error(err);
    }
    return {
      email,
      imageUrl,
    };
  }
  constructor() {}
}
