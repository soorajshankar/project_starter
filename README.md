
<p align="center">
  <a href="https://heroku.com/deploy?template=https://github.com/soorajshankar/project_starter/tree/stable" alt="Deploy to Heroku">
     <img alt="Deploy" src="https://www.herokucdn.com/deploy/button.svg"/>
  </a>
</p>


## Docker 

```shell
docker build -f Dockerfile -t sample:prod .
docker run -it --env HASURA_GRAPHQL_CONSOLE_ASSETS_DIR="/srv/console-assets/" --env DATABASE_URL="postgres://postgres:postgrespassword@192.168.1.7:5432/postgres" --env PORT=80 --rm -p 1337:80 sample:pro

```