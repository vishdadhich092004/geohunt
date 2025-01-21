import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import routes from "./routes/routes";
import { cleanupLocations } from "./services/location-delete";
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

// routes
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("Hola from GeoHunt Backend");
});

// cron schdeule to delete locations every 24 hour
const deleteLocations = async () => {
  await cleanupLocations();
};
deleteLocations();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on  ${PORT}`);
});
