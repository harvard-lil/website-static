
```docker-compose up``` starts two containers:
1) a container that builds/rebuilds the site, every time a file in the app directory changes
2) a webserver, which servers up the "dev" build of the site. If you are running Docker for Mac, it should be at http://localhost:8081/. If you are running Docker machine, you need to find out the IP address of the virtual machine, and use that (http://#.#.#.#:8081).

If you change the contents of the build-environment directory, you need to rebuild the docker image using `docker-compose build` or `docker-compose up --build`.

