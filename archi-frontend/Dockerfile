# archi-frontend/Dockerfile
FROM nginx:alpine

# 정적 파일들 그대로 복사
COPY archi-admin-web/ /usr/share/nginx/html/admin/
COPY archi-service-web/ /usr/share/nginx/html/main/

# Tailwind CSS CDN 사용하니까 빌드 과정 불필요!