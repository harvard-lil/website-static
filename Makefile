all: up prod

travis: up noclean

up:
	docker-compose up -d

rebuild_image:
	docker-compose build

down:
	docker-compose down

dev:
	docker-compose exec jekyll grunt build:dev

prod:
	docker-compose exec jekyll grunt build:prod

noclean:
	docker-compose exec jekyll grunt build:noclean

bash:
	docker-compose exec jekyll bash

gemfile_to_container: up
	docker cp build-environment/Gemfile websitestatic_jekyll_1:/usr/src/lil-website/Gemfile

gemfile_lock_from_container: up
	docker cp websitestatic_jekyll_1:/usr/src/lil-website/Gemfile.lock build-environment/Gemfile.lock
