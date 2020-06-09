import { Request, Response } from "express";
import { AuthService } from "../services/Auth";
import { func } from "joi";

const authService = new AuthService();

/**
 * Route to register the User with email and Password
 * @param req
 * @param res
 */
export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const result = await authService.register(email, password);
    console.log(`User: ${email} has been created`);

    res.json({
      message: "User created",
      data: result,
    });
  } catch (err) {
    console.log(err);
    if (String(err).includes("Username taken")) {
      return res.status(400).json({
        error: true,
        message: "Email is taken",
      });
    }
    res.status(500).json({
      error: true,
      message: "An internal server error has occurred",
    });
  }
}

/**
 * Login route
 * @param req 
 * @param res 
 */
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);
    console.log(`User: ${email} login status : : ` + result);

    if (result.ispasswordVerified) {
      res.json({
        message: "logged in successful",
        loggedInStatus: result,
      });
    } else {
      res.json({
        message: "logged in unsuccessful",
        loggedInStatus: result,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: true,
      message: "An internal server error has occurred",
    });
  }
}
