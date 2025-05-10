"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const register_1 = __importDefault(require("./routes/register"));
const patient_1 = __importDefault(require("./routes/patient"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
const allowedOrigins = ((_a = process.env.CORS_ORIGIN) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // 개발 환경에서 Postman 또는 origin이 undefined일 수 있음
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // 쿠키를 포함한 요청 허용 시 필요
}));
app.use(express_1.default.json());
app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.use("/", auth_1.default); // login api
app.use("/", register_1.default); // register api
app.use("/", patient_1.default); // patient data api
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
