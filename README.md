
```docker-compose up``` starts two containers:
1) a container that builds/rebuilds the site, every time a file in the app directory changes
2) a webserver, which servers up the "dev" build of the site at http://localhost:8081/

If you change the contents of the build-environment directory, you need to rebuild the docker image using `docker-compose build` or `docker-compose up --build`.

