
<p align="center">
  <a href="https://heroku.com/deploy?template=https://github.com/soorajshankar/project_starter/tree/stable" alt="Deploy to Heroku">
     <img alt="Deploy" src="https://www.herokucdn.com/deploy/button.svg"/>
  </a>
</p>


## Docker 

```shell
docker build -f Dockerfile -t sample:prod .
docker run -it --rm -p 1337:80 sample:prod
```