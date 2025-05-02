# 1. Node.js 베이스 이미지
FROM node:18

# 2. 앱 디렉토리 생성
WORKDIR /app

# 3. package.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 4. 소스 복사
COPY . .

# 5. Prisma CLI 설치
RUN npx prisma generate

# 6. 빌드
RUN npm run build

# 7. 실행
CMD ["npm", "start"]
