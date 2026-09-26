# Library Innovation Lab website

This repository contains the code for the [LIL website](https://lil.law.harvard.edu). We use the static site generator [Eleventy](https://www.11ty.dev) and [Tailwind CSS](https://tailwindcss.com) to build the site.

## Development setup

1. Clone this repository
2. `cd website-static`
3. `npm install` to install dependencies
4. `npm start` to start the dev server
5. View the dev server at http://localhost:8080

## Adding a staff member or affiliate

There are two steps to adding a current staff member or affiliate to the website:

1. Take a square, high-resolution grayscale profile photo and add it to `app/assets/people` using the filename pattern `firstname-lastname.jpg`. (For people who don't want to have a photo on the website, an anonymous placeholder image will be used instead.)
2. Add a profile entry to the appropriate section in `app/_data/people.yaml`, using the `firstname-lastname.jpg` filename you set in the previous step for the person's image. Be sure to set both `affiliated: true` and `current: true` if this is a current staff member/affiliate.
