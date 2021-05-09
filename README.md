# One Click Deploy Apps Starter | Hasura & ReactJS

This is a boiler plate/sample project code that shows how to build one click deploy apps with [Hasura GraphQL Engine](http://hasura.io)

## Features
1. Hasura setup with custom front end codebase in a single container.
2. Heroku one click deploy with automatic post-deploy DB migrations.
3. Docker scripts

## Deploy

<p align="center">
  <a href="https://heroku.com/deploy?template=https://github.com/soorajshankar/project_starter/tree/stable" alt="Deploy to Heroku">
     <img alt="Deploy" src="https://www.herokucdn.com/deploy/button.svg"/>
  </a>
</p>


* Using Docker 

```shell
docker build -f Dockerfile -t sample:prod .
docker run -it --env HASURA_GRAPHQL_CONSOLE_ASSETS_DIR="/srv/console-assets/" --env DATABASE_URL="postgres://postgres:postgrespassword@192.168.1.7:5432/postgres" --env PORT=80 --rm -p 1337:80 sample:prod

```