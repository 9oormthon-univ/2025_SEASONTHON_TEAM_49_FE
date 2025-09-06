# 1. 빌드 환경: Node.js를 사용하여 프로젝트를 빌드합니다.
FROM node:lts-alpine AS builder

# 작업 공간 설정
WORKDIR /app

# 의존성 설치를 위해 package.json 파일들을 먼저 복사
COPY package*.json ./
RUN npm install

# 나머지 소스 코드를 복사
COPY . .
# 프로젝트 빌드 실행
RUN npm run build

# 2. 실행 환경: Nginx 웹서버를 사용하여 빌드된 결과물을 실행합니다.
FROM nginx:stable-alpine

# 'builder' 단계에서 빌드된 정적 파일들을 Nginx의 웹 루트 폴더로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 80번 포트 개방
EXPOSE 80

# Nginx 서버 실행
CMD ["nginx", "-g", "daemon off;"]