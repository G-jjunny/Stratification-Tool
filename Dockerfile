# 1. Node.js 베이스 이미지
FROM node:18

# 2. 앱 디렉토리 생성
WORKDIR /app

# 3. package.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

RUN npm install --save-dev @types/express @types/node

# 4. 소스 복사
COPY . .

# 5. Prisma CLI 설치
RUN npx prisma generate

# 6. 빌드
RUN npm run build

# RUN npx prisma db seed

# 실행 스크립트 복사 및 권한 부여
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# 7. 실행
# CMD ["npm", "start"]
# 앱 시작 전 entrypoint 실행
CMD ["sh", "/app/entrypoint.sh"]