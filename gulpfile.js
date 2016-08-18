'use strict';

var browserify = require('browserify');
var browserifyCss = require('browserify-css');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var path = require('path');
var _ = require('lodash');
var p = require('./package.json');
var del = require('del');
var concat = require('gulp-concat');

var dist = 'dist';

var browserifyCssOpts = {
	processRelativeUrl: function(relativeUrl) {
		console.log('processRelativeUrl', relativeUrl);
		
		var stripQueryStringAndHashFromPath = function(url) {
			return url.split('?')[0].split('#')[0];
		};
		
		var relativePath = path.normalize(stripQueryStringAndHashFromPath(relativeUrl));
		var queryStringAndHash = relativeUrl.substring(relativePath.length);
		var prefix = path.normalize('../../../node_modules/');
		if (_.startsWith(relativePath, prefix)) {
			var newPrefix = path.normalize('../../node_modules/');
			var newrelativePath = newPrefix + relativePath.substring(prefix.length) + queryStringAndHash;
			return newrelativePath;
		}
		return relativeUrl;
	}
};

gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: ['test/browserify/app.js'],
    debug: true
  });
  b.transform(browserifyCss, browserifyCssOpts);

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('test/browserify/'));
});

gulp.task('build', function () {
	return gulp.src('./src/*.js')
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(concat(p.name + '.min.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dist));
});

gulp.task('clean', function() {
	return del(dist);
});
