Getting started
---------------
Clone the repo and cd inside.

Run ```docker-compose up -d``` to start two containers in the background:
1) a container for building the site
2) a webserver configured to serve up the dev build of the site. (To serve up the prod build of the site, stop all containers, toggle the appropriate lines in docker-compose.yml, and then restart the containers.)
If you are running Docker for Mac, it will serve content at http://localhost:8081/. If you are running Docker machine, you need to find out the IP address of the virtual machine, and use that (http://#.#.#.#:8081). No content will be served, of course, until you build the site.

To build the site, first attach to the jekyll container by running ```docker exec -it jekyll bash```. (This is like ssh'ing into a virtual machine.) You now have a variety of grunt commands at your disposal:
- ```grunt`` will build the dev version of the site, then will start listening for changes to the app directory. It will rebuild on each save/change. Each rebuild should take 2-7 seconds. To stop, press control + c.
- ```grunt build:dev``` will build the dev version of the site, and then stop.
- ```grunt build:prod``` will build the production version of the site, and then stop.
- ```grunt test``` will run the tests (not yet implemented)
- ```grunt deploy:staging``` will deploy the production build to our staging server (not yet implemented)
- ```grunt deploy:production``` will deploy the production build to our production server (not yet implemented)

To exist the container, press control + d.
To stop all running containers, run docker-compose stop.

### Work on the build environment

If you change any of the contents of the build-environment directory, you need to rebuild the docker image using `docker-compose build` or `docker-compose up --build`.

To ensure that an automatic rebuild is triggered for all users, increment the image version number in the Dockerfile.
