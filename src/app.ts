import express, { Request, Response } from "express";
import "dotenv/config";
import authRouter from "./routes/auth";
import registerRouter from "./routes/register";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// login api
app.use("/", authRouter);
app.use("/", registerRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
