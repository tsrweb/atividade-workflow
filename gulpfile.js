var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-html-minifier2');
var notify 	= require("gulp-notify");
 
gulp.task("sass", gulp.series( function(){
	return gulp.src(['./source/sass/*.sass','./source/scss/*.scss'])
				.pipe(sass())
				.on("error", notify.onError({title:"erro ao compilar", message:"<%= error.message %>"}))
				.pipe(gulp.dest("./dist/css"))
}));

gulp.task('minifyhtml', gulp.series( function() {
  return gulp.src('./source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
}));

gulp.task('sass:watch', gulp.series( function () {
  gulp.watch(['./source/scss/*.scss','./source/sass/*.sass'], gulp.parallel(['sass']));
}));

gulp.task('minifyhtml:watch', gulp.series( function () {
  gulp.watch('./source/*.html', gulp.parallel(['minifyhtml']));
}));
 

gulp.task("default",gulp.parallel('sass', 'minifyhtml', 'sass:watch', 'minifyhtml:watch'));