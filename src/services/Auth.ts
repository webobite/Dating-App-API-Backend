import * as argon2 from "argon2";
import crypto from "crypto";
import uuid from "uuid";
import config from "../config";
import * as jwt from "jsonwebtoken";

import { MyUser } from "../entity/MyUser";
import { getConnection } from "typeorm";

export class AuthService {
  /**
   *
   * @param email
   * @param password
   */
  public async login(email: any, password: any) {
    let ispasswordVerified = false;
    try {
      const user = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(MyUser, "user")
        .where({
          email: email,
        })
        .getOne();

        console.log("user --> " + user.password);
        console.log("user --> " + user.salt);

      if (user) {
        console.log("user --> " + user);
        ispasswordVerified = await argon2.verify(user.password, (user.salt + password));
        console.log("is password verified : : : " + ispasswordVerified);
        if (ispasswordVerified) {
          return {ispasswordVerified, user};
        }
      }
      return {
        ispasswordVerified
      };
    } catch (err) {
      throw new Error(err);
    }
  }
  constructor() {}

  /**
   * Register the User
   * @param email
   * @param password
   */
  public async register(email: string, password: string) {
    const doesUserExist = await getConnection()
      .createQueryBuilder()
      .select()
      .from(MyUser, "doesUserExist")
      .where({
        email: email,
      })
      .getOne();
    console.log("doesnotExist : : : " + doesUserExist);
    
    if (doesUserExist.email === email) throw new Error("Username taken");

    // const uid = uuid.v1();
    const salt = this.generateSalt();

    const newToken = jwt.sign({ email }, process.env.jwtSecret, {
      expiresIn: "1h",
    });

    console.log("token : : : " + newToken);

    try {
      const newToken = jwt.sign({ email }, process.env.jwtSecret, {
        expiresIn: "1h",
      });

      console.log("token : : : " + newToken);
      
      const passwordHashed = await argon2.hash(salt + password);
      const user = new MyUser();
      user.email = email.trim();
      user.password = passwordHashed;
      user.isActive = true;
      // user.uid = uid;
      user.salt = salt;
      user.imagePath = null;
      user.noOfLikes = 0;
      user.blockedByUserId.push(0);
      await user.save();
    } catch (err) {
      throw new Error(err);
    }

    return {
      email,
      newToken,
      // uid
    };
  }

  generateSalt() {
    return crypto.randomBytes(16).toString("hex");
  }
}
