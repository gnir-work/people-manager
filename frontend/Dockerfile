FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d/people_manager.conf

COPY ./build /people_manager