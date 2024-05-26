FROM node:18-alpine as nodebuilder

WORKDIR /app

COPY app/package.json app/package-lock.json ./


RUN npm install

FROM tiryoh/jekyll:4.2.1

COPY --from=nodebuilder /app/node_modules /srv/jekyll/node_modules

WORKDIR /srv/jekyll

ENV PATH="/srv/jekyll/node_modules/.bin:${PATH}"

EXPOSE 8080

CMD ["jekyll", "build", "--watch"]