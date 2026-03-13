# Library Innovation Lab website

This repository contains the code for the [LIL website](https://lil.law.harvard.edu). We use the static site generator [Eleventy](https://www.11ty.dev) and [Tailwind CSS](https://tailwindcss.com) to build the site.

## Development setup

1. Clone this repository
2. `cd website-static`
3. `npm install` to install dependencies
4. `npm start` to start the dev server
5. View the dev server at http://localhost:8080

## Writing blog posts

Head to [https://blog-generator.lil.tools/](https://blog-generator.lil.tools/) to write your post in the on-screen editor. Use the editor's buttons, if you want the preview to work correctly. (Manually-entered markdown is fine, but won't render correctly here in the preview.) Detailed instructions are below the editor, if you are into that kind of thing.

Hit the editor's "Preview/Download" to check your work.

When you are satisfied, hit the "Download" button to download your draft, and follow the simple instructions to upload your draft to GitHub.

## Adding current affiliates

At the moment, current staff and affiliates listed on the About page should have three sizes of photos. The current convention is to take a square, high-resolution grayscale image and convert it using ImageMagick. You can use something like this, assuming that the files are in the current working directory and named something like `firstname-lastname.jpg`:

```
for SIZE in 216 432 648 ; do for FILE in *.jpg ; do THUMBDIR=~/Documents/code/website-static/app/assets/thumbs/${SIZE}x${SIZE}c ; cp ${FILE} ${THUMBDIR}/ ; mogrify -scale ${SIZE}x${SIZE} -density 1x1 ${THUMBDIR}/${FILE} ; done ; done
```

For people who do not want to have an image on the website, we use a placeholder (`image: no-photo.jpg` in `people.yaml`), which was produced like this:

```
magick -size 1000x1000 xc:lightgray -fill gray -stroke gray -draw "circle 500,400 500,600" -draw "ellipse 500,950 320,400 0,360" no-photo.jpg
for SIZE in 216 432 648 ; do THUMBDIR=~/Documents/code/website-static/app/assets/thumbs/${SIZE}x${SIZE}c ; cp no-photo.jpg ${THUMBDIR}/ ; mogrify -scale ${SIZE}x${SIZE} -density 1x1 ${THUMBDIR}/no-photo.jpg ; done
```
