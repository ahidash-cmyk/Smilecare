import { Request, Response } from "express";
import { sendContactMessage } from "../services/contactServices";

export const sendMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        message: "Email and message are required",
      });
    }

    await sendContactMessage(email, message);

    return res.status(200).json({
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      message: "Failed to send message",
    });
  }
};