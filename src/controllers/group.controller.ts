import prisma from "../../prisma/client";
import { Request, Response } from "express";

/** 그룹 리스트 */
export const getGroup = async (req: Request, res: Response) => {
  const { type } = req.query;

  if (type !== "Y" && type !== "N") {
    return res.status(400).json({ error: "Invalid type. Must be Y or N." });
  }

  try {
    const group =
      type === "Y"
        ? await prisma.neoY.findFirst({
            where: { used: false },
            orderBy: { id: "asc" },
          })
        : await prisma.neoN.findFirst({
            where: { used: false },
            orderBy: { id: "asc" },
          });

    if (!group) {
      return res.status(404).json({ error: "No available group found" });
    }

    return res.json({
      id: group.id,
      group: group.group,
      serial: group.serialNum,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
