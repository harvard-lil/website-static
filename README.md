[![build status](https://github.com/harvard-lil/website-static/actions/workflows/test-build-deploy.yml/badge.svg)](https://github.com/harvard-lil/website-static/actions)

Install and Run
---------------

1. Install [Node.js](https://nodejs.org/) (v22 or later recommended).

2. `git clone https://github.com/harvard-lil/website-static.git`

3. `cd website-static`

4. `npm install`

5. `npm start`

6. Visit http://localhost:8080

7. Make changes to the `app/` directory.

  Eleventy will automatically detect changes and rebuild the site. Your browser will reload automatically when the rebuild completes.

  Exceptions: changes to `eleventy.config.js` will require restarting the dev server.


Writing Blog Posts
------------------
Head to [https://blog-generator.lil.tools/](https://blog-generator.lil.tools/) to write your post in the on-screen editor. Use the editor's buttons, if you want the preview to work correctly. (Manually-entered markdown is fine, but won't render correctly here in the preview.) Detailed instructions are below the editor, if you are into that kind of thing.

Hit the editor's "Preview/Download" to check your work.

When you are satisfied, hit the "Download" button to download your draft, and follow the simple instructions to upload your draft to Github.


Adding current affiliates
-------------------------------
At the moment, people listed at `/about` under "Who we are" should have three sizes of photos. The current convention is to take a square, high-resolution grayscale image and convert it using ImageMagick, something like this, assuming that the files are in the current working directory and named something like `firstname-lastname.jpg`:

```
for SIZE in 216 432 648 ; do for FILE in *.jpg ; do THUMBDIR=~/Documents/code/website-static/app/assets/thumbs/${SIZE}x${SIZE}c ; cp ${FILE} ${THUMBDIR}/ ; mogrify -scale ${SIZE}x${SIZE} -density 1x1 ${THUMBDIR}/${FILE} ; done ; done
```

For people who do not want to have an image on the website, we use a placeholder (`image: no-photo.jpg` in `people.yaml`), which was produced like this:

```
magick -size 1000x1000 xc:lightgray -fill gray -stroke gray -draw "circle 500,400 500,600" -draw "ellipse 500,950 320,400 0,360" no-photo.jpg
for SIZE in 216 432 648 ; do THUMBDIR=~/Documents/code/website-static/app/assets/thumbs/${SIZE}x${SIZE}c ; cp no-photo.jpg ${THUMBDIR}/ ; mogrify -scale ${SIZE}x${SIZE} -density 1x1 ${THUMBDIR}/no-photo.jpg ; done
```
