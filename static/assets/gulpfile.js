/*
 * Here are all of the gulp tasks you can use to help manage your blog
 * Use `npm install` to install all the dependencies located in package.json 
 * Then `gulp default` to minimize css and images.
 */
const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const replace = require('gulp-replace');
const sharp = require('sharp');

// Re-encode raster images and SVGs in place through libvips, so the
// optimisation step needs no native downloader binaries (which is where the
// vulnerable decompress/tar/bin-build chain used to come from).
function optimizeImage() {
  return new Transform({
    objectMode: true,
    transform(file, _enc, done) {
      const ext = path.extname(file.path).toLowerCase();
      if (file.isNull() || ext === '.gif') {
        done(null, file);
        return;
      }
      let pipeline;
      if (ext === '.svg') {
        pipeline = Promise.resolve(fs.readFileSync(file.path));
      } else if (ext === '.webp') {
        pipeline = sharp(file.path).webp({ quality: 60, effort: 6 }).toBuffer();
      } else if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = sharp(file.path).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      } else {
        pipeline = sharp(file.path).png({ compressionLevel: 9, palette: true }).toBuffer();
      }
      pipeline
        .then((buf) => {
          file.contents = buf;
          done(null, file);
        })
        .catch((err) => {
          console.log(err.toString());
          done(null, file);
        });
    }
  });
}

gulp.task('js', function minijs() {
  return gulp.src(['js/partials/**.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .on('error', (err) => {
      console.log(err.toString());
    })
    .pipe(gulp.dest("js/"))
});

gulp.task("img", function imging() {
  return gulp.src('img/**/*.{png,svg,jpg,webp,jpeg,gif}')
    .pipe(optimizeImage())
    .on('error', (err) => {
      console.log(err.toString());
    })
    .pipe(gulp.dest('img/'))
});

gulp.task('webp', function toWebp() {
  return gulp.src('img/**/*.{png,svg,jpg,jpeg}')
    .pipe(new Transform({
      objectMode: true,
      transform(file, _enc, done) {
        sharp(file.path)
          .webp({ quality: 60, effort: 6 })
          .toBuffer()
          .then((buf) => {
            file.contents = buf;
            file.extname = '.webp';
            done(null, file);
          })
          .catch((err) => {
            console.log(err.toString());
            done(null, file);
          });
      }
    }))
    .pipe(gulp.dest('img/'));
});

gulp.task('css', function minicss() {
  return gulp.src('css/vendor/bootstrap-iso.css')
    .pipe(cleanCSS())
    .on('error', (err) => {
      console.log(err.toString());
    })
    .pipe(concat('bootstrap-iso.min.css'))
    .pipe(gulp.dest('css/vendor/'));
});

gulp.task('isolate', function isolateBootstrap() {
  return gulp.src('css/bootstrap-iso.less')
    .pipe(less({strictMath: 'on'}))
    .pipe(replace('.bootstrap-iso html', ''))
    .pipe(replace('.bootstrap-iso body', ''))
    .pipe(gulp.dest('css/vendor/'));
});

gulp.task("isolate-bootstrap-css", gulp.series('isolate', 'css'));


gulp.task("default", gulp.series(gulp.parallel('js', 'css', 'img')));
