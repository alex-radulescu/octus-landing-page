'use strict';

let config = {
	outputBase: 'dist/',//has to contain trailing slash

	cssSource: ['src/css/**/*.css'],
	mainCss: "src/css/style.css",
	// printCss: "src/css/print.css",
	// fontCss: "src/css/fonts/fonts.css",
	cssOutput: 'css/',// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)
	cssName: "style.css",

	scriptsSource: ['src/scripts/**/*.js'], // for linting and watching
	startScript: 'src/scripts/script.js', // "main" file from which the bundle is created
	scriptsOutput: 'scripts/',// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)
	scriptsName: "all.js",

	// imgSource: ['src/images/**/*.{png,jpg,jpeg,gif,svg}'],
	// imgOutput: 'images',// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)

	// spritesheetSrc: './src/spritesheets/*!(.svg)',
	// spritesheetSvgs: './src/spritesheets/**/*.svg',

	// fontsSource: ['src/css/fonts/**/!(*.css)'],
	// fontsOutput: 'css/fonts/',// with trailing slash; leave empty for direct output in the outputBase (w/o trailing slash)

	// viewsSource: ['Views/**/*'],

	debug: true
};

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const del = require('del');
const glob = require('glob');
const path = require('path');
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const browserSync = require('browser-sync').create();

gulp.task('scripts', () => {
	const fs = require('fs');
	const browserify = require('browserify');
	const buffer = require('vinyl-buffer');
	const uglify = require('gulp-uglify');
	const source = require('vinyl-source-stream');

	return browserify({
		entries: `${config.startScript}`,
		debug: config.debug
	})
	.transform('babelify', { presets: ['es2015'] })
	.bundle()
	.pipe(source(config.scriptsName))
	.pipe(buffer())
	//.pipe(uglify())
	.pipe(gulp.dest(config.outputBase + config.scriptsOutput));
});

gulp.task('lint', () => {
	const jshint = require('gulp-jshint');
	return gulp.src(config.scriptsSource)
	.pipe(jshint({ esversion: 6 }))
	.pipe(jshint.reporter('default'));
});

gulp.task('css', (cb) => {
    const postcss = require('gulp-postcss');
    const cleanCSS = require('gulp-clean-css');
    const autoprefixer = require('autoprefixer');
    const precss = require('precss');
    const cssvariables = require('postcss-css-variables');

    gulp.src(config.mainCss)
		.pipe(gulpif(config.debug, sourcemaps.init()))
        .pipe(postcss([precss(), autoprefixer({ browsers: ["> 1%", "Firefox > 3", "ie > 7"] })]))
        .pipe(postcss([cssvariables({ preserve: true })]))
		.pipe(gulpif(config.debug, sourcemaps.write()))
		.pipe(gulp.dest(config.outputBase + config.cssOutput))
		.pipe(browserSync.stream());

    // gulp.src(config.printCss)
    //    .pipe(gulpif(config.debug, sourcemaps.init()))
    //    .pipe(postcss([precss(), autoprefixer({ browsers: ["> 1%", "Firefox > 3", "ie > 7"] })]))
    //    .pipe(gulpif(config.debug, sourcemaps.write()))
    //    .pipe(gulp.dest(config.outputBase + config.cssOutput))
    //    .pipe(browserSync.stream());

    // gulp.src(config.fontCss)
    //    .pipe(gulpif(config.debug, sourcemaps.init()))
    //    .pipe(postcss([precss(), autoprefixer({ browsers: ["> 1%", "Firefox > 3", "ie > 7"] })]))
    //    .pipe(gulpif(config.debug, sourcemaps.write()))
    //    .pipe(gulp.dest(config.outputBase + config.fontsOutput))
    //    .pipe(browserSync.stream());

    cb();
});

// gulp.task('fonts', () => {
// 	gulp.src(config.fontsSource)
// 	.pipe(gulp.dest(config.outputBase + config.fontsOutput));
// });

// gulp.task('images', () => {
// 	gulp.src(config.imgSource)
// 	.pipe(gulp.dest(config.outputBase + config.imgOutput));
// });

// gulp.task('spritesheets:svg', () => {
// 	glob(config.spritesheetSrc, (err, files) => {
// 		if (err) return err;
// 		files.forEach(function (folder) {
// 			var parentFolder = path.join(folder, '../');
// 			gulp.src(folder + '/*.svg')
// 				.pipe(svgSprite({
// 					mode: {
// 						symbol: {
// 							dest: '',
// 							sprite: './' + path.basename(folder),
// 							transform: []
// 						}
// 					}
// 				}))
// 				.pipe(cheerio({
// 					run: function ($, file) {
// 						$('symbol').each(function () {
// 							$(this).after('<use id="' + $(this).attr('id') + '_use" xlink:href="#' + $(this).attr('id') + '" viewBox="' + $(this).attr('viewBox') + '"/>');
// 						});
// 						$('svg').prepend('<defs><style>use { display: none; } use:target { display: inline; }</style></defs>')
// 					},
// 					parserOptions: {
// 						xmlMode: true
// 					}
// 				}))
// 				.pipe(gulp.dest(config.outputBase));
// 		});
// 	})
// });

gulp.task('clean', (cb) => {
	// todo: only remove the files, not the entire folder, probably just need to append /**/*
	del.sync([config.outputBase]);
	cb();
});

// gulp.task('browser-sync', function() {
// 	browserSync.init({
// 		proxy: "localhost:36861",
// 		//server: {
// 		//	baseDir: './dist'
// 		//},
// 		notify: {styles: {top: 'auto', bottom: '0'} }
// 	});
// });

// gulp.task('views', (cb) => {
// 	gulp
// 	.src(config.viewsSource)
//   	.pipe(gulp.dest(config.outputBase))
//         .pipe(browserSync.stream());
// 	cb();
// });

gulp.task('set-production', (cb) => { config.debug = false; cb(); });
gulp.task('set-development', (cb) => { config.debug = true; cb(); });

gulp.task('watch-scripts', () => gulp.watch(config.scriptsSource, ['scripts']));
gulp.task('watch-css', () => gulp.watch(config.cssSource, ['css']));
gulp.task('watch-fonts', () => gulp.watch(config.fontsSource, ['fonts']));
gulp.task('watch-images', () => gulp.watch(config.imgSource, ['images']));
gulp.task('watch-views', () => gulp.watch(config.viewsSource, ['browser-sync']));
gulp.task('watch-spritesheet', () => gulp.watch(config.spritesheetSvgs, ['spritesheets:svg']));

gulp.task('build', ['clean', 'set-production', 'scripts', 'css', 'fonts', 'spritesheets:svg', 'images', 'set-development']); // PRODUCTION
gulp.task('default', ['clean', 'scripts', 'css', 'images', 'fonts', 'spritesheets:svg', 'watch-scripts', 'watch-css', 'watch-fonts', 'watch-images', 'watch-views', 'browser-sync']); // DEVELOPMENT
