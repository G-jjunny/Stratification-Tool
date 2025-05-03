#!/bin/sh

# Prisma Client 생성
echo "📦 Generating Prisma Client..."
npx prisma generate

# Prisma 마이그레이션 반영 (migration history가 있다면)
echo "📂 Applying migrations..."
npx prisma migrate deploy

# Seed 데이터 삽입
echo "🌱 Running seed script..."
npx prisma db seed

# 서버 실행
echo "🚀 Starting the server..."
npm run start
