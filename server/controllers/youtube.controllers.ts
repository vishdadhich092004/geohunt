import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";

const FRONTEND_URL = process.env.FRONTEND_URL as string;
export const getYoutubeAuthUrl = async (req: Request, res: Response) => {
  try {
    // Use the first redirect URI from the environment variable
    const redirectUri = process.env.REDIRECT_URI;

    const oauth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUri
    );

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/youtube.readonly",
        "https://www.googleapis.com/auth/youtube.force-ssl",
        "https://www.googleapis.com/auth/youtube",
      ],
      prompt: "consent", // This ensures we get a refresh token
    });
    console.log("YouTube auth URL:", authUrl);
    res.redirect(authUrl);
  } catch (error) {
    console.error("YouTube auth error:", error);
    res.status(500).json({ error: "Failed to generate YouTube auth URL" });
  }
};

export const handleYoutubeCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Authorization code is required" });
    }
    console.log("YouTube callback received:", code);

    const redirectUri = process.env.REDIRECT_URI;

    const oauth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUri
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    res.cookie("youtube_tokens", tokens, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect(`${FRONTEND_URL}`);
  } catch (error) {
    console.error("YouTube callback error:", error);
    res.status(500).json({ error: "Failed to handle YouTube callback" });
  }
};
