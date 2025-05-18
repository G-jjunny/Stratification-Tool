"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroup = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
/** 그룹 리스트 */
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.query;
    if (type !== "Y" && type !== "N") {
        return res.status(400).json({ error: "Invalid type. Must be Y or N." });
    }
    try {
        const group = type === "Y"
            ? yield client_1.default.neoY.findFirst({
                where: { used: false },
                orderBy: { id: "asc" },
            })
            : yield client_1.default.neoN.findFirst({
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
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getGroup = getGroup;
