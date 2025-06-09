# nginx/Dockerfile
FROM nginx:alpine

# 프론트엔드 정적 파일 복사
COPY --from=archi-frontend:latest /usr/share/nginx/html /usr/share/nginx/html

# nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 기본 설정 파일 제거
RUN rm -f /etc/nginx/conf.d/default.conf.default

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]