import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // token in header
  const token =
    <string>req.headers["x-access-token"] || req.headers["authorization"];

  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token, process.env.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
    res.setHeader("token", token);
  } catch (error) {
    // unauthorised
    res.json({
      message : "Unauthorized Access",
      status : 401
    })
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  // const { email} = jwtPayload;
  // const newToken = jwt.sign({ email }, process.env.jwtSecret, {
  //   expiresIn: "1h",
  // });

  // console.log("token : : : " + newToken);


  next();
};

/**
 * register Schema Validator
 */
const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
});

/**
 * Add in JWT authentication while logging
 */
const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
});

/**
 * Register Payload Validator
 * @param req
 * @param res
 * @param next
 */
export function register(req: Request, res: Response, next: NextFunction) {
  const result = Joi.validate(req.body, registerSchema);

  if (result.error !== null) {
    console.log(result.error);
    return res.status(400).json({
      error: true,
      message: "Invalid input parameters",
    });
  }
  next();
}

/**
 * Login payload validator
 * @param req
 * @param res
 * @param next
 */
export function login(req: Request, res: Response, next: NextFunction) {
  const result = Joi.validate(req.body, loginSchema);

  if (result.error !== null) {
    console.log(result.error);
    return res.status(400).json({
      error: true,
      message: "Invalid input parameters",
    });
  }

  next();
}
