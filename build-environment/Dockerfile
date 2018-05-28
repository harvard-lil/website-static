FROM starefossen/ruby-node
MAINTAINER Rebecca Lynn Cremona <rcremona@law.harvard.edu>

ENV LANG C.UTF-8

# throw errors if Gemfile has been modified since Gemfile.lock
#
# to update Gemfile, comment this out, and rebuild the image.
# copy the new Germfile.lock into the repo, and then reintroduce
# this check)
RUN bundle config --global frozen 1

RUN mkdir -p /usr/src/lil-website
WORKDIR /usr/src/lil-website

RUN npm install -g grunt-cli

COPY build-environment/package.json /usr/src/lil-website
RUN npm install

COPY build-environment/Gemfile /usr/src/lil-website
COPY build-environment/Gemfile.lock /usr/src/lil-website
RUN bundle install

COPY build-environment/gruntfile.js /usr/src/lil-website
