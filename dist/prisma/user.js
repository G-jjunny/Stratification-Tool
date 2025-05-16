"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const client_1 = require("@prisma/client");
// 사용자 목록 생성
exports.users = [
    {
        institution: "SMC",
        accountId: "admin",
        password: "smc12345",
        role: client_1.Role.ADMIN,
    },
    {
        institution: "SMC",
        accountId: "smc1",
        password: "smc2472",
        role: client_1.Role.USER,
    },
    {
        institution: "SMC",
        accountId: "smc2",
        password: "smc6587",
        role: client_1.Role.USER,
    },
    {
        institution: "SMC",
        accountId: "smc3",
        password: "smc0369",
        role: client_1.Role.USER,
    },
    {
        institution: "NCCE",
        accountId: "ncce1",
        password: "ncce483",
        role: client_1.Role.USER,
    },
    {
        institution: "NCCE",
        accountId: "ncce2",
        password: "ncce990",
        role: client_1.Role.USER,
    },
    {
        institution: "NCCE",
        accountId: "ncce3",
        password: "ncce481",
        role: client_1.Role.USER,
    },
    {
        institution: "Juntendo",
        accountId: "juntendo1",
        password: "juntendo474",
        role: client_1.Role.USER,
    },
    {
        institution: "Juntendo",
        accountId: "juntendo2",
        password: "juntendo368",
        role: client_1.Role.USER,
    },
    {
        institution: "Juntendo",
        accountId: "juntendo3",
        password: "juntendo482",
        role: client_1.Role.USER,
    },
    {
        institution: "Okayama",
        accountId: "okayama1",
        password: "okayama832",
        role: client_1.Role.USER,
    },
    {
        institution: "Okayama",
        accountId: "okayama2",
        password: "okayama809",
        role: client_1.Role.USER,
    },
    {
        institution: "Okayama",
        accountId: "okayama3",
        password: "okayama781",
        role: client_1.Role.USER,
    },
];
