'use strict';

const gulp 		= require('gulp');
const babel 	= require('gulp-babel');
const eslint 	= require('gulp-eslint');


gulp.task('default', () => {
	// Run ESLint
	gulp.src(['backend/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format());

	// Port to ES5 (backend)
	gulp.src('backend/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('backend/dist'));
});
