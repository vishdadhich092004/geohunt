import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import locationRoutes from "./routes/locationRoutes";
import gameRoutes from "./routes/gameRoutes";
import guessRoutes from "./routes/guessRoutes";
import userRoutes from "./routes/userRoutes";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/locations", locationRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/guesses", guessRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Hey from GeoHunt Backend");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on  ${PORT}`);
});
