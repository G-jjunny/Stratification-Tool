import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
