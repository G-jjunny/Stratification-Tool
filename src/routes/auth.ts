import express, { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/login", async (req: Request, res: Response) => {
  const { accountId, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { accountId },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 로그인 성공
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        accountId: user.accountId,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
