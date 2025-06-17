FROM nginx:alpine

# 정적 파일 복사
COPY ./archi-admin-web /usr/share/nginx/html/admin
COPY ./archi-service-web /usr/share/nginx/html/main

# Nginx 설정 복사
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]