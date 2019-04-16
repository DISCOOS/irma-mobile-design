const gulp = require('gulp');
const extract = require("gulp-html-extract");

gulp.task('default', () => {
  //console.log('Hello World!');

  // gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp))

  //return Promise.resolve();

  return gulp
    .src("dist/index.html")
    .pipe(extract({
      sel: "script, #build_index_js"
    }))
    .pipe(
      gulp.dest("tmp")
    );

});
