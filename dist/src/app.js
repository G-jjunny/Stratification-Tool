"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});
app.get("/", (req, res) => {
    res.send("Server is running!");
});
// login api
app.use("/", auth_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
