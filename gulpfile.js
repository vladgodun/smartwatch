const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSycn = require("browser-sync").create();
const concat = require("gulp-concat");
const gcmq = require("gulp-group-css-media-queries");

//compile scss into css
function style() {
  // 1.where is my scss file
  return (
    gulp
    .src("./scss/**/*.scss")
    // 2. pass that file through sass compiler
    // .pipe(less())
    .pipe(sass())
    .pipe(gcmq())
    // 3. where do I save the compiled CSS?
    .pipe(concat("all.css"))
    .pipe(gulp.dest("./css"))

    // 4. stream changes to all browser
    .pipe(browserSycn.stream())
  );
}



function watch() {
  browserSycn.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./scss/**/*.scss", style);
  gulp.watch("./*.html").on("change", browserSycn.reload);
  gulp.watch("./js/**/*.js").on("change", browserSycn.reload);
}

exports.style = style;
exports.watch = watch;