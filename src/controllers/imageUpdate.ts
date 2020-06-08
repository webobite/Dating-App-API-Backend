import { Response, Request } from "express";
import { ImageService } from "../services/ImageService";


export async function updateImage(req: Request, res: Response) {
  const { email, imgUrl } = req.body;
  try {
    const result = await ImageService.updateImage(email, imgUrl);
    console.log(`Image for User: ${email} has been updated`);

    res.json({
      message: "User created",
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
