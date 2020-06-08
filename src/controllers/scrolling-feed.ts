import { Request, Response } from "express";
import { ScrollingService } from "../services/ScrollingService";
import { func } from "joi";

const scrollingService = new ScrollingService();

export async function scroll(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const result = await scrollingService.scrollFeed(email);
    console.log("All user's retrived .... ");
    res.json({
      message: "User retrived successfully",
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
