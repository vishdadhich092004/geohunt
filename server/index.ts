import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hey from GeoHunt Backend");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on  ${PORT}`);
});
