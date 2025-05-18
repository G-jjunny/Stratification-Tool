"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("../controllers/register.controller");
const group_controller_1 = require("../controllers/group.controller");
const router = (0, express_1.Router)();
router.post("/register", register_controller_1.registerPatient); // 새등록용 엔드포인트
router.put("/update/:id", register_controller_1.updatePatient); // 수정용 엔드포인트
router.delete("/delete/:id", register_controller_1.deletePatient); // 삭제용 엔드포인트
router.get("/group", group_controller_1.getGroup); // 그룹 조회용 엔드포인트
exports.default = router;
