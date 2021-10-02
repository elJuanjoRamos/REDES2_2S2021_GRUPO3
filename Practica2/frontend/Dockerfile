# Stage 1: Build an Angular Docker Image
FROM node:latest as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
ARG configuration=production
RUN npm run build


# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
