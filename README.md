Getting started
---------------
Clone the repo and cd inside.

Run ```docker-compose up -d``` to start two containers in the background:
1)  a container for building the site
2)  a webserver configured to serve up development and production builds of site.

To build the site, run one of the following three commands:
- ```docker-compose exec jekyll grunt``` will build the dev (expanded) version of the site, then will start listening for changes to the app and assets/src directories. It will rebuild on each save/change. The initial build after cloning the repo will be the slowest. Each subsequent rebuild should be shorter. To stop the process, press control + c.
- ```docker-compose exec jekyll grunt build:dev``` will build the dev (expanded) version of the site, and then return.
- ```docker-compose exec jekyll grunt build:prod``` will build the production (compressed) version of the site, and then return.

To view the current builds in your browser:
- If you are running Docker for Mac, visit http://localhost:8080/ to see the dev build and http://localhost:8081 to see the prod build.
- If you are running Docker Machine, run ```docker-machine ip``` to discover the IP address of your virtualbox. Then, vist http://#.#.#.#:8080 to see the dev build and http://#.#.#.#:8081 to see the prod build.

To stop all running containers, run ```docker-compose stop```.

To stop and remove all containers created via docker-compose up, run ```docker-compose down```.

If you need to start fresh for some reason, run ```docker-compose down --rmi local```.

If you change the contents of docker-compose.yml, running ```docker-compose up -d``` again should cause your changes to get picked up.

### Work on the build environment

If you change any of the contents of the build-environment directory, you need to rebuild the docker image.
- option 1 (best for iterating locally): run ```docker-compose build``` or ```docker-compose up -d --build```
- option 2 (best for when you are finished): increment the tag for lil-website in docker-compose.yml. This ensures that an automatic rebuild is triggered for all users, when they pull in your changes.

Periodically, you might want to run ```docker images``` to see if you have accumulated a lot of cruft. Clean up manually, or try running ```docker-compose down --rmi local```.

### Coming soon
- ```<some command> test``` will run the tests (not yet implemented)
- ```<some command> deploy:staging``` will deploy the production build to our staging server (not yet implemented)
- ```<some command> deploy:production``` will deploy the production build to our production server (not yet implemented)

We're considering using a makefile as a convenient method for capturing these commands. Feedback welcome!


Writing Blog Posts
------------------
Head to [https://lil-blog-generator.herokuapp.com/](https://lil-blog-generator.herokuapp.com/) to write your post in the on-screen editor. Use the editor's buttons, if you want the preview to work correctly. (Manually-entered markdown is fine, but won't render correctly here in the preview.) Detailed instructions are below the editor, if you are into that kind of thing.

Hit the editor's "Preview/Download" to check your work.

When you are satisfied, hit the "Download" button to download your draft, and follow the simple instructions to upload your draft to Github.
