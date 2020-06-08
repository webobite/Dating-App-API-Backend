import { MyUser } from "../entity/MyUser";
import { getConnection } from "typeorm";

export class ImageService {
  /**
   * update Image function
   * @param email
   * @param imageUrl
   */
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
      console.log("ERROR ---> ", err);
      throw new Error(err);
    }
    return {
      email,
      imageUrl,
    };
  }

  /**
   * Image like Function (it increase like on users image)
   * @param email
   * @param imageUrl
   */
  public static async imageLike(email: string, imageUrl: string) {
    try {
      const updateImageResult = await getConnection()
        .createQueryBuilder()
        .update(MyUser)
        .set({
          noOfLikes: () => "noOfLikes + 1",
        })
        .where({ email: email })
        .execute();

      console.log("Updated Image Result : : : ", updateImageResult);
      return {
        email,
        updateImageResult,
        imageUrl,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
  constructor() {}
}
