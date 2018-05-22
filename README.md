Install and Run
---------------

1. Install [Docker](https://docs.docker.com/installation/) or [Docker Toolbox](https://www.docker.com/products/docker-toolbox) and fire it up.

2. `git clone https://github.com/harvard-lil/website-static.git`

3. `cd website-static`

4. Fire up the web server and build the site: `make`

5. Check out what you built:
   -  Docker: head to http://localhost:8081/
   -  Docker Machine: run `docker-machine ip` to discover the IP address of your virtualbox. Then, head to http://that-ip-address:8081/

6. To rebuild the website and experience your changes: run `make` again, and refresh your browser window.

7. When you are done playing, run `make down`. Then:
  - Docker: quit the Docker app too, if you like
  - Docker Machine: run `docker-machine stop`, if you like


### Or, For More Control

If running `make` doesn't suit your work-style (takes too long, etc.), you have more fined-grained commands at your disposal.

```make up``` (or ```docker-compose up -d```) starts two containers in the background:
1)  a container for building the site
2)  a webserver configured to serve up development and production builds of site.

Those containers need to be running for you to build, re-build, or view the website.

You have three options for building/re-building the website:
- ```make listen``` or ```docker-compose exec jekyll grunt``` will build the dev ("expanded", non-minified, non-optimized) version of the site, then will start listening for changes to the app and assets/src directories. It will rebuild on each save/change. The initial build after cloning the repo will be the slowest. Each subsequent rebuild should be shorter. To stop the process, press control + c. For the dev version of the site, head to http://localhost:8080/.
- ```make dev``` or ```docker-compose exec jekyll grunt build:dev``` will build the dev ("expanded", non-minified, non-optimized) version of the site, and then return. For the dev version of the site, head to http://localhost:8080/.
- ```make prod``` or ```docker-compose exec jekyll grunt build:prod``` will build the production (compressed) version of the site, and then return. For the prod version of the site, head to http://localhost:8081/.

When you are done, use `make down` or `docker-compose stop` to stop your containers.

If something is wrong with your environment and you'd like to blast away your docker images and start completely fresh, run ```docker-compose down --rmi local```. The next time you attempt to start your containers, Docker will build you a new image automatically.


### Working on the build environment

If you change any of the contents of the build-environment directory (for instance, if you change any configurations in gruntfile.js), you need to rebuild the docker image.
- option 1 (best for iterating locally): run ```make rebuild_image``` or ```docker-compose build``` or ```docker-compose up -d --build```
- option 2 (best for when you are finished): increment the tag for lil-website in docker-compose.yml. This ensures that an automatic rebuild is triggered for all users, when they pull in your changes.

If you need to update the Gemfile: update it. Comment out ```RUN bundle config --global frozen 1``` from the Dockerfile. Run ```make rebuild_image``` followed by ```make gemfile_lock_from_container```. Uncomment that line from the Dockerfile, ```make rebuild_image``` again... And you're done.

Periodically, you might want to run ```docker images``` to see if you have accumulated a lot of cruft. Clean up manually, or try running ```docker-compose down --rmi local```.


Writing Blog Posts (Docker not required)
----------------------------------------
Head to [https://lil-blog-generator.herokuapp.com/](https://lil-blog-generator.herokuapp.com/) to write your post in the on-screen editor. Use the editor's buttons, if you want the preview to work correctly. (Manually-entered markdown is fine, but won't render correctly here in the preview.) Detailed instructions are below the editor, if you are into that kind of thing.

Hit the editor's "Preview/Download" to check your work.

When you are satisfied, hit the "Download" button to download your draft, and follow the simple instructions to upload your draft to Github.
