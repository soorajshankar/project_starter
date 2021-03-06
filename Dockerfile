FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
# RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build
# RUN find ./build/static/js -type f -name 'main.*.js' -exec sh -c 'x="{}"; mv "$x" "./build/static/js/main.js"' \;
# RUN find ./build/static/css -type f -name 'main.*.css' -exec sh -c 'x="{}"; mv "$x" "./build/static/css/main.css"' \;
RUN gzip /app/build/versioned/main.js
RUN gzip /app/build/versioned/main.css

#Build
FROM hasura/graphql-engine:v2.0.0-alpha.4

# Enable the console
ENV HASURA_GRAPHQL_ENABLE_CONSOLE=true

# Enable debugging mode. It should be disabled in production.
# ENV HASURA_GRAPHQL_DEV_MODE=true

# Heroku hobby tier PG has few limitations including 20 max connections
# https://devcenter.heroku.com/articles/heroku-postgres-plans#hobby-tier
ENV HASURA_GRAPHQL_PG_CONNECTIONS=15

ENV HASURA_GRAPHQL_CONSOLE_ASSETS_DIR='/app/'

COPY --from=build /app/build/versioned /app/versioned
COPY --from=build /app/hasura /hasura
COPY --from=build /app/bootstrap.sh /bootstrap.sh

RUN apt update
RUN apt install curl -y
RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash
RUN hasura update-cli --version v2.0.0-alpha.6

EXPOSE 80

# Change $DATABASE_URL to your heroku postgres URL if you're not using
# the primary postgres instance in your app     
CMD graphql-engine \
    --database-url $DATABASE_URL \
    serve \
    --server-port $PORT

# CMD graphql-engine \
#     --database-url postgres://postgres:postgrespassword@192.168.1.7:5432/postgres \
#     serve \
#     --server-port 80