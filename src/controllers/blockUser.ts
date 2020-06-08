import { Response, Request } from "express";
import { BlockUserService } from "../services/UserBlockService";

export async function userBlock(req: Request, res: Response) {
  const { email, blockedUserEmail } = req.body;
  try {
    const result = await BlockUserService.blockUser(email, blockedUserEmail);
    console.log(`Image for User: ${blockedUserEmail} has been Blocked from user email ${email}`);

    res.json({
      message: "User Blocked Successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      message: "An internal server error has occurred",
    });
  }
}
