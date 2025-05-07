import express, { Request, Response } from "express";
import authRouter from "./routes/auth";
import registerRouter from "./routes/register";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
app.use(
  cors({
    origin: function (origin, callback) {
      // 개발 환경에서 Postman 또는 origin이 undefined일 수 있음
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // 쿠키를 포함한 요청 허용 시 필요
  })
);
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
