# One Click Deploy Apps Starter | Hasura & ReactJS

This is a boiler plate/sample project code that shows how to build one click deploy apps with [Hasura GraphQL Engine](http://hasura.io)

## Features
1. Hasura setup with custom front end codebase in a single container.
2. Heroku one click deploy with automatic post-deploy DB migrations.
3. Docker scripts

## Deploy

* Heroku Deploy 
<p align="center">
  <a href="https://heroku.com/deploy?template=https://github.com/soorajshankar/project_starter/tree/stable" alt="Deploy to Heroku">
     <img alt="Deploy" src="https://www.herokucdn.com/deploy/button.svg"/>
  </a>
</p>

1. Click the above link
  
![heroku_screen](./docs/assets/heroku_1.png)
2. Choose your app name 
  
![heroku_screen](./docs/assets/heroku_2.png)
2. Make sure you replace the app name on the `HEROKU_APP_NAME` field, this will make sure the DB & Hasura is initialised with correct data. 
  
![heroku_screen](./docs/assets/heroku_3.png)
3. Visit the newly created TODO APP
  
![app_screen](./docs/assets/TodoAppScr.png)

* Using Docker 

```shell
docker build -f Dockerfile -t sample:prod .
docker run -it --env HASURA_GRAPHQL_CONSOLE_ASSETS_DIR="/srv/console-assets/" --env DATABASE_URL="postgres://postgres:postgrespassword@192.168.1.7:5432/postgres" --env PORT=80 --rm -p 1337:80 sample:prod

```


##  Setting up dev environment
### Prerequisites
* Docker Compose & Docker
* NodeJS
* Hasura CLI

### Steps

1. Run Dockerised Hasura Instance following this [link](https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple.html) and make sure you have Hasura running on http://localhost:8080 
2. clone this repository and copy the `example.env` as `.env` 
    ```sh
    https://github.com/soorajshankar/project_starter.git
    cd project_starter
    cp example.env .env
    cd ..
    ```
3. setup Hasura & Database 
    ```sh
    cd hasura
    hasura migrate apply --database-name default
    hasura metadata apply
    ```
3. Install NodeJS dependancies- run `npm install`
4. Run React JS dev server `npm start`
5. visit http://localhost:3000, sample TODO app must be running