import { Role } from "@prisma/client";

// 사용자 목록 생성
export const users = [
  {
    institution: "SMC",
    accountId: "admin",
    password: "smc12345",
    role: Role.ADMIN,
  },
  {
    institution: "SMC",
    accountId: "smc1",
    password: "smc2472",
    role: Role.USER,
  },
  {
    institution: "SMC",
    accountId: "smc2",
    password: "smc6587",
    role: Role.USER,
  },
  {
    institution: "SMC",
    accountId: "smc3",
    password: "smc0369",
    role: Role.USER,
  },
  {
    institution: "NCCE",
    accountId: "ncce1",
    password: "ncce483",
    role: Role.USER,
  },
  {
    institution: "NCCE",
    accountId: "ncce2",
    password: "ncce990",
    role: Role.USER,
  },
  {
    institution: "NCCE",
    accountId: "ncce3",
    password: "ncce481",
    role: Role.USER,
  },
  {
    institution: "Juntendo",
    accountId: "juntendo1",
    password: "juntendo474",
    role: Role.USER,
  },
  {
    institution: "Juntendo",
    accountId: "juntendo2",
    password: "juntendo368",
    role: Role.USER,
  },
  {
    institution: "Juntendo",
    accountId: "juntendo3",
    password: "juntendo482",
    role: Role.USER,
  },
  {
    institution: "Okayama",
    accountId: "okayama1",
    password: "okayama832",
    role: Role.USER,
  },
  {
    institution: "Okayama",
    accountId: "okayama2",
    password: "okayama809",
    role: Role.USER,
  },
  {
    institution: "Okayama",
    accountId: "okayama3",
    password: "okayama781",
    role: Role.USER,
  },
];
