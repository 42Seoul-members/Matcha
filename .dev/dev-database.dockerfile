FROM mariadb:10.9.3
RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./.dev/dev-database-initdb.sql /docker-entrypoint-initdb.d
RUN chmod +x /docker-entrypoint-initdb.d/dev-database-initdb.sql

STOPSIGNAL SIGTERM
EXPOSE 3306
