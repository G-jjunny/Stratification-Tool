import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs"; // bcryptjs import
import prisma from "../../prisma/client";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { accountId, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { accountId },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid account ID or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid account ID or password" });
    }

    // 로그인 성공
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        accountId: user.accountId,
        role: user.role,
        institution: user.institution,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
