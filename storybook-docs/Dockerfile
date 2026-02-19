FROM nginx:alpine

ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d

COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY dist /usr/share/nginx/dist

EXPOSE 80
