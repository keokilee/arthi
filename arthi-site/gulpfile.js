'use strict';

// Requiring dependencies
let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let rename = require('gulp-rename');
let csso = require('gulp-csso');


// Loading plugins
let $ = require('gulp-load-plugins')({
	overridePattern: false,
	pattern: [
		'imagemin-pngquant',
		'postcss-reporter',
		'postcss-scss',
		'stylelint',
	],
});


// Reload Browser-Sync
let reload = (done) => {
	browserSync.reload();
	done();
};



// Transpile PUG templates to HTML markup
gulp.task('html', () => {
	gulp.src('src/*.pug')
		.pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
		.pipe($.pug({pretty: true}))
		.pipe(gulp.dest('build'));

	return gulp.src('src/blocks/**/*.pug')
		.pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
		.pipe($.pug({pretty: true}))
		.pipe(gulp.dest('src/blocks'));
});


// Linting css
gulp.task('lint:css', () => {
	return gulp.src(['src/sass/**/*.scss', 'src/blocks/**/*.scss'])
		.pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
		.pipe($.cached('lint:css', {
			optimizeMemory: true,
		}))
		.pipe($.postcss([
			$.stylelint(),
			$.postcssReporter({
				clearReportedMessages: true,
			}),
		], {
			parser: $.postcssScss,
		}));
});


// Transpile SCSS styles to CSS
gulp.task('css', () => {
	gulp.src('src/sass/main.scss')
		.pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
		.pipe($.sass({errLogToConsole: true}))
		.pipe($.autoprefixer())
		.pipe(gulp.dest('build/css'))
		.pipe(rename( path => {
			path.basename += ".min"
		}))
		.pipe(csso())
		.pipe(gulp.dest('build/css'));
});


// Fixes in main,s
gulp.task('js', () => {
	return gulp.src('src/js/main.js')
		.pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
		.pipe($.fileInclude({prefix: '// @'}))
		.pipe($.replace(/(\r?\n){3,}/g, '$1$1'))
		.pipe($.replace(/;(\r?\n)\$\(/g, ';$1$1\$('))
		.pipe(gulp.dest('build/js'));
});


// Minifying 3-rd party plugins
gulp.task('js:vendor', () => {
	return gulp.src('src/js/vendors.js')
		.pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
		.pipe($.fileInclude({prefix: '// @'}))
		.pipe($.uglify())
		.pipe(gulp.dest('build/js'));
});


// Optimizing images
gulp.task('images', () => {
	return gulp.src('src/blocks/*/images/**/*.*')
		.pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
		.pipe(gulp.dest('build/blocks'));
});

// Creating svg sprite
gulp.task('svg', () => {
	return gulp.src('src/pug/svg.pug')
		.pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
		.pipe($.inject(
			gulp.src('src/sprite/svg/**/*.svg')
				.pipe($.newer('src/pug/svg.pug'))
				.pipe($.rename({prefix: 'svg-icon-'}))
				.pipe($.svgmin())
				.pipe($.svgstore({inlineSvg: true})),
			{
				transform: (filePath, file) => file.contents.toString(),
			})
		)
		.pipe(gulp.dest('src/pug'));
});


// Copying fonts into site directory
gulp.task('fonts', () => {
	gulp.src('src/fonts/**/*.*')
		.pipe($.newer('build/fonts'))
		.pipe(gulp.dest('build/fonts'));
});


// Build the project
gulp.task('build', [
	'html',
	'css',
	'js',
	'js:vendor',
	'svg',
	'fonts',
	'images'
]);


// Reloading tasks. Invokes when gulp tasks triggered
gulp.task('html:reload', ['html'], reload);
gulp.task('css:reload', ['css'], reload);
gulp.task('js:reload', ['js'], reload);
gulp.task('js:vendor:reload', ['js:vendor'], reload);
gulp.task('images:reload', ['images'], reload);
gulp.task('svg:reload', ['svg'], reload);
gulp.task('fonts:reload', ['fonts'], reload);


// Watching files for live-reload
gulp.task('watch', () => {
	$.watch([
		'src/**/*.pug',
	], () => {
		gulp.start([
			'html:reload',
		]);
	});

	$.watch([
		'src/sass/**/*.scss',
		'src/blocks/**/*.scss',
	], () => {
		gulp.start([
			'css:reload',
		]);
	});

	$.watch([
		'src/js/**/*.js',
		'!src/js/vendors.js',
		'!src/js/vendors/**/*.js',
		'src/blocks/**/*.js',
	], () => {
		gulp.start([
			'js:reload',
		]);
	});

	$.watch([
		'src/js/vendors.js',
	], () => {
		gulp.start([
			'js:vendor:reload',
		]);
	});

	$.watch([
		'src/blocks/*/images/**/*.*',
	], () => {
		gulp.start([
			'images:reload',
		]);
	});

	$.watch([
		'src/sprite/svg/**/*.svg',
	], () => {
		gulp.start([
			'svg:reload',
		]);
	});

	$.watch([
		'src/fonts/**/*.*',
	], () => {
		gulp.start([
			'fonts:reload',
		]);
	});
});


// Run Browser-sync server
gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: './build',
		}
	});
});


// Default task for 'gulp' cli command
gulp.task('default', ['build']);

gulp.task('serwatch', ['serve', 'watch'])